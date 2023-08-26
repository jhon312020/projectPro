import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { err_handle, login, res } from '../model/productinformation';
import { ApiService } from '../_service/api.service';
import { GlobalService } from '../_service/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({});

  constructor(private fb:FormBuilder, public gData: GlobalService, private router: Router, private api: ApiService) {
    this.loginForm = fb.group({
      email: ['',[Validators.required,Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required]]
    });
   }
   get f(){
    return this.loginForm.controls;
  }

  ngOnInit(): void {
    this.gData.clearBreadcrumbs();
    this.gData.getAuth();
    this.gData.Breadcrumbs.sub_div2.name = "Login";
    this.gData.Breadcrumbs.sub_div2.route = "login";
  }

  onSubmit() {
    let data: login = {
      email: this.f['email'].value,
      password: this.f['password'].value
    }
    // this.router.navigate(['/dashboard']);
    // localStorage.setItem("token", JSON.stringify(this.constdata.token));
    this.api.login(data).subscribe((res: any) => {
      if (res.status) {
        this.gData.success = res;
        localStorage.setItem("token", JSON.stringify(res.success));
        // console.log(res);
        if(res.role == "admin") {
          this.gData.AdminOrUser = "/admin";
          this.router.navigate(["/admin"]);
        } else {
          this.gData.AdminOrUser = "/dashboard";
          this.router.navigate(['/dashboard']);
        }
      } else {
        this.f['email'].setErrors({invalid: true});
        this.f['password'].setErrors({invalid: true});
        this.gData.failure.status = true;
        this.gData.failure.message = res.message;
      }
    });
  }

}

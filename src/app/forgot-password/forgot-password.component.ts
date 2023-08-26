import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { err_handle, forgotPassword, res } from '../model/productinformation';
import { ApiService } from '../_service/api.service';
import { GlobalService } from '../_service/global.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotForm: FormGroup = new FormGroup({});
  showLoader: boolean = false;
  constructor(private fb:FormBuilder, public gData: GlobalService, private router: Router, private api: ApiService) {
    this.forgotForm = fb.group({
      email: ['',[Validators.required,Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    });
   }
   get f(){
    return this.forgotForm.controls;
  }

  ngOnInit(): void {
    this.gData.clearBreadcrumbs();
    if (this.gData.isAuth()) {
      this.router.navigate(['/dashboard']);
    }
    this.gData.Breadcrumbs.sub_div2.name = "Forgot Password";
    this.gData.Breadcrumbs.sub_div2.route = "forgot-password";
  }

  onSubmit() {
    this.showLoader = true;
    let data: forgotPassword = {
      email: this.f['email'].value,
    }
    this.api.forgot(data).subscribe((res: any) => {
      this.showLoader = false;
      if (res.status) {
        this.forgotForm.reset();
        this.gData.success.status = true;
        this.gData.success.message = res.message;
      } else {
        this.f['email'].setErrors({invalid: true});
        this.gData.failure.status = true;
        this.gData.failure.message = res.message;
      }
    });
  }

}

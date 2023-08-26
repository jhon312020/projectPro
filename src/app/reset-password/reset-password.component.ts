import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmedValidator } from '../confirmed.validator';
import { err_handle, login, res, resetPassword } from '../model/productinformation';
import { ApiService } from '../_service/api.service';
import { GlobalService } from '../_service/global.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetForm: FormGroup = new FormGroup({});
  showLoader: boolean = false;
  currentRoute: string[] = [];
  reset: resetPassword = {
    resetToken: "",
    email: "",
    password: "",

  }
  constructor(private fb: FormBuilder, private api: ApiService, private gData: GlobalService, private router: Router) { 
    this.resetForm = fb.group({
      password : ['', [Validators.required, Validators.minLength(6),Validators.maxLength(20)]],
      confirm_password: ['', [Validators.required]]
    }, {
      validator: ConfirmedValidator('password', 'confirm_password')
    })
  }
  get f(){
    return this.resetForm.controls;
  }

  ngOnInit(): void {
    this.gData.clearBreadcrumbs();
    if (this.gData.isAuth()) {
      this.router.navigate(['/dashboard']);
    }
    this.currentRoute = this.router.url.split("/");
    if (this.currentRoute.length > 1) {
      this.currentRoute = this.currentRoute.slice(-2);
      if (this.currentRoute.length == 2) {
        this.reset.email = this.currentRoute[0];
        this.reset.resetToken = this.currentRoute[1];
      }
    }
    console.log(this.currentRoute);
    this.gData.Breadcrumbs.sub_div2.name = "Reset Password";
    this.gData.Breadcrumbs.sub_div2.route = "reset-password";
  }

  onSubmit() {
    this.showLoader = true;
    this.reset.password = this.f['password'].value;
    // this.router.navigate(['/dashboard']);
    // localStorage.setItem("token", JSON.stringify(this.constdata.token));
    this.api.reset(this.reset).subscribe((res: any) => {
      this.showLoader = false;
      if (res.status) {
        this.resetForm.reset();
        this.gData.success.status = true;
        this.gData.success.message = res.message;
      } else {
        this.gData.failure.status = true;
        this.gData.failure.message = res.message;
      }
    });
  }

}


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmedValidator } from '../../confirmed.validator';
import { changePassword } from '../../model/productinformation';
import { ApiService } from '../../_service/api.service';
import { GlobalService } from '../../_service/global.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  changePasswordForm: FormGroup = new FormGroup({});
  err:string | undefined;
  id: number = 0;

  submitted: {status: boolean, showLoader: boolean} = {
    status: false,
    showLoader: false
  }

  constructor(private fb: FormBuilder, private api: ApiService, private gData: GlobalService, private route: Router) { 
    this.changePasswordForm = fb.group({
      old_password: ['',[Validators.required]],
      password : ['', [Validators.required, Validators.minLength(6),Validators.maxLength(20)]],
      confirm_password: ['', [Validators.required]]
    }, {
      validator: ConfirmedValidator('password', 'confirm_password')
    })
  }
  get f() {
    return this.changePasswordForm.controls;
  }

  ngOnInit(): void {
    this.loadId();
    this.gData.Breadcrumbs.sub_div3.name = "Change Password";
    this.gData.Breadcrumbs.sub_div3.route = "/dashboard/changepassword";
  }

  async loadId() {
    let user =await this.api.getUser();
    this.id = user.id;
  }

  onSubmit() {
    this.submitted.status = true;
    if (this.changePasswordForm.valid) {
      this.submitted.showLoader = true;
      let change: changePassword = {
        old_password: this.f['old_password'].value,
        new_password: this.f['password'].value,
      }
      change.userToken = this.api.user?.user_token;
      let id = this.api.user?.id as number;
      this.api.changePassword(id, change).subscribe((res: {success: any, message: any}) => {
        this.submitted.showLoader = false;
        if (res.success) {
          this.changePasswordForm.reset();
          localStorage.removeItem('token');
          this.route.navigate(['/login']);
        } else {
          this.err = res.message;
        }
      });
    }
  }
}

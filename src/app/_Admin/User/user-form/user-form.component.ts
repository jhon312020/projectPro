import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmedValidator } from 'src/app/confirmed.validator';
import { user, res, err_handle } from 'src/app/model/productinformation';
import { ApiService } from 'src/app/_service/api.service';
import { GlobalService } from 'src/app/_service/global.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  @Output() sendRes: EventEmitter<any> = new EventEmitter<any>();
  @Input() Admin: boolean = true;
  @Input() Data: user = {
    name: "",
    email: "",
    mobile: "",
    password: "",
    role: "user"
  }
  userForm: FormGroup = new FormGroup({});
  @Input() err: err_handle = {
    status: null,
    msg: ""
  };
  create: boolean = false;

  submitted: {status: boolean, showLoader: boolean} = {
    status: false,
    showLoader: false
  }
 
  constructor(private fb:FormBuilder, private router:Router, private gData: GlobalService, private api: ApiService) {}

  get f() {
    return this.userForm.controls;
  }

  ngOnInit(): void {
    this.editOrCreate();
  }
  editOrCreate() {
    if (this.Data.name == "") {
      this.create = true;
      this.createFormValidation();
    } else {
      this.create = false;
      this.editFormValidation();
    }
  }
  createFormValidation() {
    this.userForm = this.fb.group({
      name: [this.Data.name,[Validators.required, Validators.pattern('[a-zA-Z]+$')]],
      email: [this.Data.email,[Validators.required,Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      mobile: [this.Data.mobile, [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      password: [this.Data.password, [Validators.required,Validators.minLength(6),Validators.maxLength(20)]],
      confirm_password: ['', [Validators.required]],
      role: [this.Data.role, Validators.required],
      status: [this.Data.status, Validators.required]
    }, {
      validator: ConfirmedValidator('password', 'confirm_password')
    });
  }
  editFormValidation() {
    this.userForm = this.fb.group({
      name: [this.Data.name,[Validators.required, Validators.pattern('[a-zA-Z]+$')]],
      email: [this.Data.email,[Validators.required,Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      mobile: [this.Data.mobile, [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      role: [this.Data.role, Validators.required],
      status: [this.Data.status, Validators.required]
    });
  }

  onSubmit() {
    this.submitted.status = true;
    if (this.userForm.valid) {
      this.submitted.showLoader = true;
      let user: user = {
        name: this.f['name'].value, 
        email: this.f['email'].value, 
        mobile: this.f['mobile'].value,
        role: this.f['role'].value,
        status: this.f['status'].value
      }
      if (this.create) {
        user.password = this.f['password'].value;
      } else {
        user.id = this.Data.id;
      }
      this.sendRes.emit(user);
      let self = this;
      setInterval(function() {console.log(self.submitted.showLoader = false);}, 800);
    }
  }
}

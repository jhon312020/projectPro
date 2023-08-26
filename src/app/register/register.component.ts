import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmedValidator } from '../confirmed.validator';
import { res, user } from '../model/productinformation';
import { ApiService } from '../_service/api.service';
import { GlobalService } from '../_service/global.service';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup = new FormGroup({});
  err: string | undefined;

  public log: string[] = [];

  constructor(private fb:FormBuilder, private router:Router, private gData: GlobalService, private api: ApiService, private recaptchaV3Service: ReCaptchaV3Service) { }
  
  ngOnInit(): void {
    this.gData.clearBreadcrumbs();
    this.gData.Breadcrumbs.sub_div2.name = "Register";
    this.gData.Breadcrumbs.sub_div2.route = "register";
    if (this.gData.isAuth()) {
      this.router.navigate(['/dashboard']);
    }
    this.loadForm();
  }
  loadForm() {
    this.registerForm = this.fb.group({
      name: ['',[Validators.required, Validators.pattern('[a-zA-Z]+$')]],
      email: ['',  [Validators.required,Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      mobile: ['', [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      password: ['', [Validators.required,Validators.minLength(6),Validators.maxLength(20)]],
      confirm_password: ['', [Validators.required]],
      checkbox: ['', Validators.required],
      // recaptchaReactive:['',Validators.required]
    }, {
      validator: ConfirmedValidator('password', 'confirm_password')
    });
  }

  get f(){
    return this.registerForm.controls;
  }

  onSubmit() {
    let user: user = {
      name: this.f['name'].value, 
      email: this.f['email'].value, 
      mobile: this.f['mobile'].value, 
      password: this.f['password'].value, 
      role: "user"
    }
    this.api.register(user).subscribe((res: res) => {
      if (res.status) {
        this.gData.success = res;
        this.router.navigate(['/login']);
      } else {
        this.err = res.message;
        this.f['email'].setErrors({invalid:true});
      }
    });
  }

  //Recapacha functionality

  public executeRecaptchaV3() {
    this.log.push(`Recaptcha v3 execution requested...`);
    this.recaptchaV3Service.execute('myAction').subscribe(
      (token) => {
        this.addTokenLog('Recaptcha v3 token', token);
      },
      (error) => {
        this.log.push(`Recaptcha v3 error: see console`);
        console.log(`Recaptcha v3 error:`, error);
      }
    );
  }
  public addTokenLog(message: string, token: string | null) {
    this.log.push(`${message}: ${this.formatToken(token)}`);
  }

  public onError() {
    this.log.push(`reCAHPTCHA errored;`);
  }

  public formatToken(token: string | null) {
    return token !== null
      ? `${token.substring(0, 7)}...${token.substring(token.length - 7)}`
      : 'null';
  }

  public printLog() {
    return this.log
      .map((logEntry, index) => `${index + 1}. ${logEntry}`)
      .join('\n');
  }
}

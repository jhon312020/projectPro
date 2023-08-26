import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/_service/global.service';
import { environment } from 'src/environments/environment';
import { Contact, res} from 'src/app/model/productinformation';
import { ApiService } from 'src/app/_service/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  currentRoute: string[] = [];
  contactAdmin = {
    address: "",
    email: "",
    mobile_number: "",
    open_hours: "",
  }
  
  ContactForm: FormGroup = new FormGroup({}); 

  @Input() Data: Contact = {
    name: "",
    email: "",
    mobile_number: "",
    subject: "",
    message: "",
  }
  @Output() sendRes:EventEmitter<Contact> = new EventEmitter<Contact>();

  contact: Contact = {
    name: "",
    email: "",
    mobile_number: "",
    subject: "",
    message: "",
  }
  submitted: {status: boolean, showLoader: boolean} = {
    status: false,
    showLoader: false
  }
 
  constructor(private api:ApiService, public gData:GlobalService, private router:Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.validating();
    this.currentRoute = this.router.url.split("/");
    if (this.currentRoute.length > 1) {
      if (this.currentRoute[1] == 'contact-us') {
        this.gData.Breadcrumbs.sub_div2.name = "Contact Us";
        this.gData.Breadcrumbs.sub_div2.route = "contact";
      } else {
        this.gData.clearBreadcrumbs();
      }
    }
    this.contactAdmin.address = environment.address;
    this.contactAdmin.email = environment.email;
    this.contactAdmin.mobile_number = environment.mobile_number;
    this.contactAdmin.open_hours = environment.open_hours;
  }

  validating() {
    this.ContactForm = this.fb.group({
      name: [this.Data.name, Validators.required],
      email: [this.Data.email,[Validators.required,Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      mobile_number: [this.Data.mobile_number, [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      subject: [this.Data.subject, Validators.required],
      message: [this.Data.message, [Validators.required]],
    });
  }
  get formInfo(){
    return this.ContactForm.controls;
  }

  onSubmit() {
    this.submitted.status = true;
    this.contact.name = this.formInfo['name'].value;
    this.contact.email = this.formInfo['email'].value;
    this.contact.mobile_number = this.formInfo['mobile_number'].value;
    this.contact.subject = this.formInfo['subject'].value;
    this.contact.message = this.formInfo['message'].value;
    if (this.ContactForm.valid) {
      //this.sendRes.emit(this.contact);
      const formData = new FormData();
      formData.append("name", this.contact.name);
      formData.append("email", this.contact.email);
      formData.append("mobile_number", this.contact.mobile_number);
      formData.append("subject", this.contact.subject);
      formData.append("message", this.contact.message);
      this.sendMessageToAdmin(formData);
    }
  }

  sendMessageToAdmin(formData: any) {
    this.submitted.showLoader = true;
    this.api.sendMessage(formData).subscribe((res: res) => {
      console.log('sendMessage',res.status);
      this.submitted.showLoader = false;
      if (res.status) {
        this.ContactForm.reset();
        this.submitted.status = false;
        //this.formGroupDirective.resetForm();
        // this.ContactForm.markAsPristine();
        // this.ContactForm.markAsUntouched();
        // this.ContactForm.updateValueAndValidity();
        this.gData.success = res;
        //this.router.navigate(["/admin/projectslist"]);
      } else {
        this.gData.failure.status = true;
        this.gData.failure.message = res.message;
      }
      },
      (err: any) => {
        this.submitted.showLoader = false;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
        });
      },
    )
  } 

}

import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { err_handle, user } from '../model/productinformation';
import { ApiService } from '../_service/api.service';

@Component({
  selector: 'app-intrested-form',
  templateUrl: './intrested-form.component.html',
  styleUrls: ['./intrested-form.component.css']
})
export class IntrestedFormComponent implements OnInit {

  @Output() sendRes: EventEmitter<any> = new EventEmitter<any>();
  interestedForm: FormGroup = new FormGroup({});
  @Input() err: err_handle = {
    status: null,
    msg: ""
  };
  @Input() Data: user = {
    name: "",
    email: "",
    mobile: "",
    role: "user"
  }
  @Input() submitButton = {
    text: "I am Interested",
  }
  @ViewChild('requestElement') 
  requestElement!: ElementRef;
  submitted: {status: boolean, showLoader: boolean} = {
    status: false,
    showLoader: false
  }

  constructor(private fb:FormBuilder, private api: ApiService, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.loadData();
  }
  // ngDoCheck() {
  //   if (this.submitButton.text == "") {
  //     this.renderer.setAttribute(this.requestElement.nativeElement, "disabled", "disabled");
  //     const childElements = this.requestElement.nativeElement.children;
  //     console.log(childElements);
  //     console.log(childElements.length);
  //     return;
  //     for (let child of childElements) {
  //       this.renderer.removeChild(this.requestElement.nativeElement, child);
  //     }
  //     let i = this.renderer.createElement("i");
  //     const text = this.renderer.createText(' Please wait!');
  //     this.renderer.setAttribute(i, "class", "fas fa-circle-notch fa-spin");
  //     this.renderer.appendChild(this.requestElement.nativeElement, i);
  //     this.renderer.appendChild(this.requestElement.nativeElement, text);
  //   }
  // }
  
  loadData() {
    this.interestedForm = this.fb.group({
      name: [this.Data.name,[Validators.required, Validators.pattern('[a-zA-Z]+$')]],
      email: [this.Data.email,[Validators.required,Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      mobile: [this.Data.mobile, [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      role: [this.Data.role, Validators.required]
    });
  }

  get f(){
    return this.interestedForm.controls;
  }

  onSubmit() {
    // console.log("hello from interested form!");
    let user: user = {
      name: this.f['name'].value, 
      email: this.f['email'].value, 
      mobile: this.f['mobile'].value,
      role: this.f['role'].value
    }
    // console.log(user);
    this.submitted.showLoader = true;
    this.sendRes.emit(user);
  }

}


import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { category, err_handle, Testimonial } from 'src/app/model/productinformation';
import { ApiService } from 'src/app/_service/api.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/_service/global.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-testimonial-form',
  templateUrl: './testimonial-form.component.html',
  styleUrls: ['./testimonial-form.component.css']
})
export class TestimonialFormComponent implements OnInit {

  @ViewChild("ImgInput")
  selectedImgFile!: ElementRef;
  @Input() Data: Testimonial = {
    name: "",
    img: "",
    message: "",
    rating: "",
    admin_approval: true
  }
  @Output() sendRes:EventEmitter<Testimonial> = new EventEmitter<Testimonial>();
  
  // public Editor = ClassicEditor;
  TestimonialForm: FormGroup = new FormGroup({});
  submitted: {status: boolean} = {
    status: false
  }
  img_err: err_handle = {
    status: null,
    msg: ""
  }
 
  img_src: any = '';
  Testimonial: Testimonial = {
    name: "",
    img: "",
    message: "",
    rating: "",
    admin_approval: true
  }

  constructor(private api:ApiService, private fb: FormBuilder, public gf: GlobalService) { }

  async ngOnInit() {
    this.validating();
    if (this.Data.img) {
      this.img_src = environment.backend+this.Data.img;
    }
    if (this.Data.id) {
      this.Testimonial.name = this.Data.name;
      this.Testimonial.id = this.Data.id;
      this.Testimonial.img = this.Data.img;
    }
  }


  validating() {
    this.TestimonialForm = this.fb.group({
      name: [this.Data.name, Validators.required],
      img: [],
      message: [this.Data.message, Validators.required],
      rating: [this.Data.rating, Validators.required],
      admin_approval: [this.Data.admin_approval],
    });
  }
  get formData(){
    return this.TestimonialForm.controls;
  }


  createObjectURL(object: Blob | MediaSource) {
    return (window.URL) ? window.URL.createObjectURL(object) : window.webkitURL.createObjectURL(object);
  }

  onChangeInChoosefile(event: any) {
    if (event.target.files.length) {
      let res = this.gf.fileValidator(event.target.files, "img", 2, "mb");
      if (res) {
        if (res.result[0].status == "success") {
          this.img_err.status = false;
          this.img_err.msg = res.result[0].message;
          this.Testimonial.img = res.files;
        } else {
          this.img_err.status = true;
          this.img_err.msg = res.result[0].message;
          this.Testimonial.img = null;
        }
        // this.MyFiles = res.files;
        if (res.files.length) {
          for (var i in res.files) {
            this.img_src =  this.createObjectURL(res.files[i]);
          }
        }
      }
    } else {
      this.img_src = "";
      this.img_err.status = true;
      this.Testimonial.img = null;
    }
  }

  removeImg() {
    this.img_src = "";
    this.img_err.status = null;
    this.img_err.msg = "";
    this.selectedImgFile.nativeElement.value = null;
    this.Testimonial.img = null;
  }

  onSubmit() {
    this.submitted.status = true;
    this.Testimonial.message = this.formData['message'].value;
    this.Testimonial.rating = this.formData['rating'].value;
    this.Testimonial.admin_approval = this.formData['admin_approval'].value;
    this.Testimonial.name = this.formData['name'].value;
    if (this.Testimonial.img == "") {
      this.img_err.status = true;
      this.img_err.msg = "Image is required!";
    }
    if (this.TestimonialForm.valid && this.Testimonial.img != "") {
      this.sendRes.emit(this.Testimonial);
    }
  }

}

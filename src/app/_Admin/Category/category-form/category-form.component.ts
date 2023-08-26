import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { category, err_handle } from '../../../model/productinformation';
import { ApiService } from '../../../_service/api.service';
import { GlobalService } from '../../../_service/global.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
  @ViewChild("FileInput")
  selectedFile!: ElementRef;
  @Input() data : category | undefined;
  @Input() heading: {title: string, content: string} | undefined;
  @Input() submited: {status: boolean} = {status: false};
  @Output() sendRes:EventEmitter<category> = new EventEmitter<category>();

  CategoryForm: FormGroup = new FormGroup({});
  category: category = {
    title: '',
    slug: '',
    img: null,
    status: true,
    order_by: 1
  }
  img_err:err_handle = {
    status: null,
    msg: ""
  }
  MyFiles:any[] = [];
  img_src:any = '';
  title: string = "Category";
  order_by: number = 1;

  constructor(private fb:FormBuilder, private gf: GlobalService, private api: ApiService) { }

  ngOnInit(): void {
    this.loadData();
    this.validating();
  }
  loadData() {
    if(this.data) {
      this.category = this.data;
      if (this.data.img) {
        this.img_src = environment.backend + this.data.img;
      }
    }
  }

  validating() {
    this.CategoryForm = new FormGroup({
      title: new FormControl(this.category.title, Validators.required),
      order_by: new FormControl(this.category.order_by, Validators.required),
      status: new FormControl(this.category.status)
    })
  }
  get f(){
    return this.CategoryForm.controls;
  }

  onChangeInTitle() {
    const d = new Date();
    let time = d.getTime();
    if (!this.f['title'].invalid) {
      this.category.title = this.f['title'].value;
      this.category.slug = this.f['title'].value.toLowerCase().replaceAll(" ", "-")+"_"+time;
    }
  }
  onChangeInOrderBy() {
    if (!this.f['order_by'].invalid) {
      this.category.order_by = this.f['order_by'].value;
    }
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
          this.category.img = res.files;
        } else {
          this.img_err.status = true;
          this.img_err.msg = res.result[0].message;
          this.category.img = null;
        }
        this.MyFiles = res.files;
        if (res.files.length) {
          for(var i in res.files) {
            this.img_src =  this.createObjectURL(res.files[i]);
          }
        }
      }
    } else {
      this.img_src = "";
      this.img_err.status = null;
      this.category.img = null;
    }
  }

  removeImg() {
    this.img_src = "";
    this.img_err.status = null;
    this.img_err.msg = "";
    this.selectedFile.nativeElement.value = null;
    this.category.img = null;
  }

  // async getImgPath() {
  //   const formData = new FormData();
  //   formData.append("file", this.MyFiles[0], "category."+this.MyFiles[0].name.split('.').pop());
  //   let res = await this.api.uploadFile(formData).toPromise();
  //   this.category.img = res.filename[0];
  // }
  onSubmit() {
    this.submited.status = true;
    if (this.CategoryForm.valid && !this.img_err.status) {
      this.category.status = this.f['status'].value;
      this.sendRes.emit(this.category);
    }
  }

  // async onSubmit_old() {
  //   this.submited = true;
  //   if (this.CategoryForm.valid && !this.img_err.status) {
  //     if (this.MyFiles.length) {
  //       await this.getImgPath();
  //     }
  //     this.category.status = this.f['status'].value;
  //     // console.log(this.category);
  //     this.api.CreateCategory(this.category).subscribe((res: res) => {
  //       if(res.status) {
  //         console.log(res.message);
  //       } else {
  //         console.log(res.message);
  //       }
  //     });
  //   }
  // }
}

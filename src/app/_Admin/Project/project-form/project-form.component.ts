import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { category, err_handle, Project } from 'src/app/model/productinformation';
import { ApiService } from 'src/app/_service/api.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/_service/global.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {

  @ViewChild("ImgInput")
  selectedImgFile!: ElementRef;
  @Input() Data: Project = {
    title: "",
    slug: "",
    type: "",
    img: "",
    content: "",
    category_id: "",
    description: "",
    price: 0,
    discount: 0,
    src_code: "",
    status: true
  }
  @Output() sendRes:EventEmitter<Project> = new EventEmitter<Project>();
  
  // public Editor = ClassicEditor;
  categories: category[] = [];
  ProjectForm: FormGroup = new FormGroup({});
  submitted: {status: boolean} = {
    status: false
  }
  img_err: err_handle = {
    status: null,
    msg: ""
  }
  src_code_err: err_handle = {
    status: null,
    msg: ""
  }
  img_src: any = '';
  project: Project = {
    title: "",
    slug: "",
    type: "",
    img: "",
    content: "",
    category_id: "",
    description: "",
    price: '',
    discount: '',
    src_code: "",
    status: true
  }

  constructor(private api:ApiService, private fb: FormBuilder, public gf: GlobalService) { }

  async ngOnInit() {
    this.validating();
    this.categories = await this.api.getActiveCategories().toPromise();
    if (this.Data.img) {
      this.img_src = environment.backend+this.Data.img;
    }
    if (this.Data.id) {
      this.project.title = this.Data.title;
      this.project.slug = this.Data.slug;
      this.project.id = this.Data.id;
      this.project.img = this.Data.img;
      this.project.src_code = this.Data.src_code;
    }
    this.loadEditor();
  }

  loadEditor() {
    // @ts-ignore
    let editor = new FroalaEditor('#editor', {
      attribution: false,
      events: {
        'initialized': () => {
          // Do something here.
          // this is the editor instance.
          if (this.f['content'].value != "") {
            editor.html.insert(this.f['content'].value);
          } 
        },
        'contentChanged': () => {
          // Do something here.
          // this is the editor instance.
          this.f['content'].setValue(editor.html.get());
        }
      }
    });
  }

  validating() {
    this.ProjectForm = this.fb.group({
      title: [this.Data.title, Validators.required],
      type: [this.Data.type, Validators.required],
      img: [],
      src_code: [],
      description: [this.Data.description],
      content: [this.Data.content, Validators.required],
      price: [this.Data.price, [Validators.required]],
      discount: [this.Data.discount],
      category_id: [this.Data.category_id, Validators.required],
      status: [this.Data.status],
    });
  }
  get f(){
    return this.ProjectForm.controls;
  }

  onChangeInTitle() {
    const d = new Date();
    let time = d.getTime();
    if (!this.f['title'].invalid) {
      this.project.title = this.f['title'].value;
      this.project.slug = this.f['title'].value.toLowerCase().replaceAll(" ", "-")+"_"+time;
    }
  }

  onChangeInSourceCode(event: any) {
    if (event.target.files.length) {
      let files = event.target.files;
      let res = this.gf.fileValidator(files, "zip", 20, "mb");
      if (res) {
        if (res.result[0].status == "success") {
          this.src_code_err.status = false;
          this.src_code_err.msg = res.result[0].message;
          this.project.src_code = res.files;
        } else {
          this.src_code_err.status = true;
          this.src_code_err.msg = res.result[0].message;
          this.project.src_code = null;
        }
      }
    } else {
      this.src_code_err.status = null;
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
          this.project.img = res.files;
        } else {
          this.img_err.status = true;
          this.img_err.msg = res.result[0].message;
          this.project.img = null;
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
      this.project.img = null;
    }
  }

  removeImg() {
    this.img_src = "";
    this.img_err.status = null;
    this.img_err.msg = "";
    this.selectedImgFile.nativeElement.value = null;
    this.project.img = null;
  }

  onSubmit() {
    this.submitted.status = true;
    this.project.category_id = this.f['category_id'].value;
    this.project.content = this.f['content'].value;
    this.project.description = this.f['description'].value;
    this.project.discount = this.f['discount'].value;
    this.project.price = this.f['price'].value;
    this.project.status = this.f['status'].value;
    this.project.type = this.f['type'].value;
    if (this.project.img == "") {
      this.img_err.status = true;
      this.img_err.msg = "Image is required!";
    }
    if (this.project.src_code == "") {
      this.src_code_err.status = true;
      this.src_code_err.msg = "Source Code is required!";
    }
    if (this.ProjectForm.valid && this.project.src_code != "" && this.project.img != "") {
      this.sendRes.emit(this.project);
    }
  }

}

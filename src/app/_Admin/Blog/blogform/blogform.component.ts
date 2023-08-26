import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { blogs, category, err_handle } from 'src/app/model/productinformation';
import { ApiService } from 'src/app/_service/api.service';
import { GlobalService } from 'src/app/_service/global.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blogform',
  templateUrl: './blogform.component.html',
  styleUrls: ['./blogform.component.css']
})
export class BlogformComponent implements OnInit, AfterViewInit {
  @ViewChild("FileInput")
  selectedFile!: ElementRef;
  @ViewChild("content")
  BlogContent!: ElementRef;
  @Input() data : blogs | undefined;
  @Input() heading: {title: string, content: string} | undefined;
  @Input() submited: {status: boolean} = {status: false};
  @Output() sendRes:EventEmitter<blogs> = new EventEmitter<blogs>();

  BlogForm: FormGroup = new FormGroup({});
  img_err:err_handle = {
    status: null,
    msg: ""
  }
  img_src:any = '';
  today: any;
  categories: category[] = [];

  Blog: blogs = {
    title: "",
    slug: "",
    img: "",
    content: "",
    status: true
  }
  
  constructor(private gData:GlobalService, private api:ApiService) { }

  async ngOnInit() {
    this.validating();
    this.dateFinder();
    this.categories = await this.api.getActiveCategories().toPromise();
    this.loadData();
    this.loadEditor();
  }
  loadEditor() {
    // @ts-ignore
    // new FroalaEditor("#editor");
    let editor = new FroalaEditor('#editor', {
      events: {
        'initialized': () => {
          // Do something here.
          // this is the editor instance.
          if(this.f['content'].value != "") {
            editor.html.insert(this.f['content'].value);
          } 
        },
        'contentChanged': () => {
          // Do something here.
          // this is the editor instance.
          this.f['content'].setValue(editor.html.get());
          // data = editor.html.get();
          // console.log(editor.html.get());
        }
      }
    });
  }
  ngAfterViewInit(): void {
    // // @ts-ignore
    // // new FroalaEditor("#editor");
    // let editor = new FroalaEditor('#editor', {
    //   events: {
    //     'contentChanged': function () {
    //       // Do something here.
    //       // this is the editor instance.
    //       // this.f['content'].value
    //       console.log(editor.html.get());
    //     }
    //   }
    // });
  }

  loadData() {
    if (this.data) {
      this.Blog.title = this.data.title;
      this.Blog.slug = this.data.slug;
      if (this.data.img) {
        this.img_src = environment.backend+this.data.img;
        this.Blog.img = this.data.img;
      }
      if (this.data.id) {
        this.Blog.id = this.data.id;
      }
    }
    
  }
  validating() {
    this.BlogForm = new FormGroup({
      title: new FormControl(this.data?.title, Validators.required),
      content: new FormControl(this.data?.content, Validators.required),
      launch_date: new FormControl(this.data?.launch_date),
      category_id: new FormControl(this.data?.category_id),
      status: new FormControl(this.data?.status)
    });
  }
  get f(){
    return this.BlogForm.controls;
  }

  dateFinder() {
    var date = new Date();
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();

    this.today =  yyyy + '-' + mm + '-' + dd;
  }

  onChangeInTitle() {
    const d = new Date();
    let time = d.getTime();
    if (!this.f['title'].invalid) {
      this.Blog.title = this.f['title'].value;
      this.Blog.slug = this.f['title'].value.toLowerCase().replaceAll(" ", "-")+"_"+time;
    }
  }

  createObjectURL(object: Blob | MediaSource) {
    return (window.URL) ? window.URL.createObjectURL(object) : window.webkitURL.createObjectURL(object);
  }

  onChangeInChoosefile(event: any) {
    if (event.target.files.length) {
      let res = this.gData.fileValidator(event.target.files, "img", 2, "mb");
      if (res) {
        if(res.result[0].status == "success") {
          this.img_err.status = false;
          this.img_err.msg = res.result[0].message;
          this.Blog.img = res.files;
        } else {
          this.img_err.status = true;
          this.img_err.msg = res.result[0].message;
          this.Blog.img = null;
        }
        let MyFiles = res.files;
        if (res.files.length) {
          for(var i in res.files) {
            this.img_src =  this.createObjectURL(res.files[i]);
          }
        }
      }
    } else {
      this.img_src = "";
      this.img_err.status = null;
      this.Blog.img = this.data?.img;
    }
  }

  removeImg() {
    this.img_src = "";
    this.img_err.status = null;
    this.img_err.msg = "";
    this.selectedFile.nativeElement.value = null;
    this.Blog.img = null;
  }

  onSubmit() {
    this.submited.status = true;
    this.Blog.content = this.f['content'].value;
    this.Blog.category_id = this.f['category_id'].value;
    this.Blog.status = this.f['status'].value;
    this.Blog.launch_date = this.f['launch_date'].value;
    if(this.Blog.img == "") {
      this.img_err.status = true;
      this.img_err.msg = "Image is required!";
    }
    if(this.BlogForm.valid && this.Blog.img) {
      this.sendRes.emit(this.Blog);
    }
    
  }

}

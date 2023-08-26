import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { blogs } from 'src/app/model/productinformation';
import { ApiService } from 'src/app/_service/api.service';
import { GlobalService } from 'src/app/_service/global.service';

@Component({
  selector: 'app-adminblogs',
  templateUrl: './adminblogs.component.html',
  styleUrls: ['./adminblogs.component.css']
})
export class AdminblogsComponent implements OnInit {

  Data: blogs | undefined;
  Heading: {title: string, content: string} ={
    title: "",
    content: ""
  };
  submited: {status: boolean} = {status: false};
  pre_img: string = "";

  InitialBlog: blogs = {
    title: "",
    slug: "",
    img: "",
    content: "",
    category_id: "",
    status: true
  }
  Blog: blogs = {
    title: "",
    slug: "",
    img: "",
    content: "",
    category_id: "",
    status: true
  }
  
  constructor(private Activerouter:ActivatedRoute, private gData:GlobalService, private api:ApiService, private router:Router) { }

  ngOnInit(): void {
    this.loadData(this.Activerouter.snapshot.params);
    this.gData.Breadcrumbs.sub_div3.name = "Blogs";
    this.gData.Breadcrumbs.sub_div3.route = "/admin/blogslist";
  }

  loadData(id: any ) {
    if (id.id) {
      this.Heading.title = "Edit Blog";
      this.Heading.content = "If you want to edit this Blog for your site!, please fill this form and submit to Edit blog";
      let token = this.gData.getToken();
      this.api.getBlogById(id.id, token).subscribe((res:any) => {
        // console.log(res.success);
        if(res.status) {
          this.Data = res.success;
        } else {
          this.Data = this.InitialBlog;
        }
      });
    } else {
      this.Heading.title = "Create Blog";
      this.Heading.content = "If you want to create a Bolgs for your site!, please fill this form and submit to create blog";
      this.Data = this.InitialBlog;
    }
  }

  receiveRes(e:blogs) {
    const formData = new FormData();
    formData.append('title', e.title);
    formData.append('slug', e.slug);
    formData.append('content', e.content as string);
    formData.append('img', e.img);
    if(e.launch_date) {
      formData.append('launch_date', e.launch_date);
    }
    if(e.category_id) {
      formData.append('category_id', e.category_id.toString());
    }
    formData.append('status', e.status.toString());
    if (Array.isArray(e.img)) {
      formData.append("img", e.img[0], "blog."+e.img[0].name.split('.').pop());
    }
    if(e.id) {
      formData.append('id', e.id.toString());
      formData.append('pre_img', this.pre_img);
      // console.log(e);
      this.updateBlog(formData);
    } else {
      // console.log(e);
      this.createBlog(formData);
    }
  }

  createBlog(formData: any) {
    this.api.createBlogs(formData, this.gData.getToken()).subscribe((res:any) => {
      if(res.status) {
        this.gData.success = res;
        this.router.navigate(["/admin/blogslist"]);
      } else {
        this.gData.failure.status = true;
        this.gData.failure.message = res.message;
      }
    });
  }

  updateBlog(formData: any) {
    let token = this.gData.getToken();
    this.api.updateBlog(formData, token).subscribe((res:any) => {
      if(res.status) {
        this.gData.success = res;
        this.router.navigate(["/admin/blogslist"]);
      } else {
        this.gData.failure.status = true;
        this.gData.failure.message = res.message;
      }
    })
  }

}

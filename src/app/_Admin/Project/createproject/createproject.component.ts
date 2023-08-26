import { Component, OnInit } from '@angular/core';
import { Project, res } from 'src/app/model/productinformation';
import { GlobalService } from 'src/app/_service/global.service';
import { ApiService } from 'src/app/_service/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-createproject',
  templateUrl: './createproject.component.html',
  styleUrls: ['./createproject.component.css']
})
export class CreateprojectComponent implements OnInit {
  Heading: string = "Add Project";
  content: string = "Create a project for your site!";
  data: Project | undefined;
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
  pre_img: string = "";
  pre_src: string = "";
  
  constructor(private api:ApiService, private router:Router, public gData: GlobalService, private ActiveRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadData(this.ActiveRoute.snapshot.params);
    this.gData.Breadcrumbs.sub_div3.name = "Projects";
    this.gData.Breadcrumbs.sub_div3.route = "/admin/projectslist";
  }
  async loadData(params:any) {
    if (params.id) {
      let token = this.gData.getToken();
      let pro:{status: boolean, response: Project} = await this.api.getprojectById(params.id, token).toPromise();
      if (pro.status) {
        this.data = pro.response;
        this.Heading = "Edit Project";
        this.content = "Edit your old project for your site!";
      }
    } else {
      this.data = this.project;
    }
  }

  receiveRes(e:Project) {
    // console.log(e);
    const formData = new FormData();
    formData.append("title", e.title);
    formData.append("slug", e.slug);
    formData.append("type", e.type);
    formData.append("category_id", e.category_id.toString());
    formData.append("description", e.description);
    formData.append("price", e.price.toString());
    formData.append("status", e.status.toString());
    formData.append("userToken", this.gData.getToken());
    if(e.discount) {
      formData.append("discount", e.discount.toString());
    } else {
      formData.append("discount", '');
    }
    formData.append("content", e.content as string);

    formData.append("img", e.img);
    if (Array.isArray(e.img)) {
      formData.append("img", e.img[0], "project."+e.img[0].name.split('.').pop());
    }
    formData.append("src_code", e.src_code);
    if (Array.isArray(e.src_code)) {
      formData.append("src_code", e.src_code[0], e.slug+"project."+e.src_code[0].name.split('.').pop());
    }
    if (e.id) {
      // console.log(e);
      formData.append("id", e.id.toString());
      formData.append("pre_img", this.pre_img);
      formData.append("pre_src", this.pre_src);
      this.UpdateProject(formData);
    } else {
      this.createProject(formData);
    }
  }

  createProject(formData: any) {
    this.api.createProject(formData).subscribe((res: res) => {
      console.log('create',res.status);
      if (res.status) {
        this.gData.success = res;
        this.router.navigate(["/admin/projectslist"]);
      } else {
        this.gData.failure.status = true;
        this.gData.failure.message = res.message;
      }
      },
      (err: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
        });
      },
    )
  } 
  UpdateProject(formData: any) {
    this.api.UpdateProject(formData).subscribe((res:res) => {
        if (res.status) {
          this.gData.success = res;
          this.router.navigate(['/admin/projectslist']);
        } else {
          this.gData.failure.status = true;
          this.gData.failure.message = res.message;
        }
      }, 
      (err: any) => {
        console.log('Error', err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
        });
        //this.router.navigate(["/admin/projectslist"]);
      },
    )
  }
}

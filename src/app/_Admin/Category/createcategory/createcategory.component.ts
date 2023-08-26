import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { category, res } from '../../../model/productinformation';
import { ApiService } from '../../../_service/api.service';
import { GlobalService } from '../../../_service/global.service';

@Component({
  selector: 'app-creatcategory',
  templateUrl: './createcategory.component.html',
  styleUrls: ['./createcategory.component.css']
})
export class CreatecategoryComponent implements OnInit {
  
  Data:category | undefined;
  Heading: {title: string, content: string} ={
    title: "",
    content: ""
  };
  InitialCategory : category = {
    title: '',
    slug: '',
    img: null,
    status: true,
    order_by: 1
  }
  category: category = {
    title: '',
    slug: '',
    img: null,
    status: true,
    order_by: 1
  }
  submited: {status: boolean} = {status: false};
  pre_img: string  = "";

  constructor(private Activerouter: ActivatedRoute , private router: Router, private api: ApiService, public gData: GlobalService) { }

  ngOnInit(): void {
    this.loadData(this.Activerouter.snapshot.params);
    this.gData.Breadcrumbs.sub_div3.name = "Categories";
    this.gData.Breadcrumbs.sub_div3.route = "/admin/categorylist";
  }

  async loadData(id:any) {
    let userToken = this.gData.getToken();
    if (id.id) {
      let cat:{status: boolean, response: category} = await this.api.getCategory(id.id, userToken).toPromise();
      if (cat.status) {
        this.Data = cat.response;
        this.pre_img = cat.response.img;
        this.Heading.title = "Edit Category";
        this.Heading.content = "Edit your old category for your projects!";
      }
    } else {
      this.Data = this.InitialCategory;
      this.Heading.title = "Add Category";
      this.Heading.content = "Create your new category for your projects!";
    }
  }
  async receiveRes(e:category){
    // this.submited.status = false;
    const formData = new FormData();
    formData.append("img", e.img);
    if (Array.isArray(e.img)) {
      formData.append("img", e.img[0], "category."+e.img[0].name.split('.').pop());
    }
    formData.append("title", e.title);
    formData.append("slug", e.slug);
    formData.append("order_by", e.order_by.toString());
    formData.append("status", e.status.toString());
    formData.append("userToken", this.gData.getToken());
    if (e.id) {
      formData.append("id", e.id.toString());
      formData.append("pre_img", this.pre_img);
      this.editCategory(formData);
    } else {
      this.createCategory(formData);
    }
  }

  createCategory(formData: any) {
    this.api.CreateCategory(formData).subscribe((res: res) => {
      if (res.status) {
        this.gData.success = res;
        this.submited.status = false;
        this.router.navigate(["/admin/categorylist"])
      } else {
        this.submited.status = false;
        this.gData.failure.status = true;
        this.gData.failure.message = res.message;
      }
    });
  }

  editCategory(formData:any) {
    this.api.UpdateCategory(formData).subscribe((res: res) => {
      if (res.status) {
        this.submited.status = false;
        this.gData.success = res;
        this.router.navigate(["/admin/categorylist"])
      } else {
        this.submited.status = false;
        this.gData.failure.status = true;
        this.gData.failure.message = res.message;
      }
    });
  }



  old_function() {
        // this.category = e;
    // if (e.id) {
    //   // console.log(e);
    //   // this.category.img = {pre: this.pre_img, cur: e.img};
    //   // this.api.UpdateCategory(this.category).subscribe((res: res) => {
    //   //   if(res.status) {
    //   //     this.submited = 'false';
    //   //     this.gData.success = res;
    //   //   } else {
    //   //     this.submited = 'false';
    //   //     this.gData.failure.status = true;
    //   //     this.gData.failure.message = res.message;
    //   //   }
    //   // });
    // } else {
    //   this.api.CreateCategory(this.category).subscribe((res: res) => {
    //     if(res.status) {
    //       this.gData.success = res;
    //       this.submited = 'false';
    //     } else {
    //       this.submited = 'false';
    //       this.gData.failure.status = true;
    //       this.gData.failure.message = res.message;
    //     }
    //   });
    // }
  }

}

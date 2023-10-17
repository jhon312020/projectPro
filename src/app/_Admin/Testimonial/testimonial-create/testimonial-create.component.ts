import { Component, OnInit } from '@angular/core';
import { Testimonial, res } from 'src/app/model/productinformation';
import { GlobalService } from 'src/app/_service/global.service';
import { ApiService } from 'src/app/_service/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-testimonial-create',
  templateUrl: './testimonial-create.component.html',
  styleUrls: ['./testimonial-create.component.css']
})
export class TestimonialCreateComponent implements OnInit {
  Heading: string = "Add Testimonial";
  content: string = "Create a testimonial for your site!";
  data: Testimonial | undefined;
  Testimonial: Testimonial = {
    name: "",
    img: "",
    message: "",
    rating: "",
    admin_approval: true
  }
  pre_img: string = "";
  pre_src: string = "";
  
  constructor(private api:ApiService, private router:Router, public gData: GlobalService, private ActiveRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadData(this.ActiveRoute.snapshot.params);
    this.gData.Breadcrumbs.sub_div3.name = "Testimonials";
    this.gData.Breadcrumbs.sub_div3.route = "/admin/Testimonialslist";
  }
  async loadData(params:any) {
    if (params.id) {
      let token = this.gData.getToken();
      let pro:{status: boolean, response: Testimonial} = await this.api.getTestimonialById(params.id, token).toPromise();
      if (pro.status) {
        this.data = pro.response;
        this.Heading = "Edit Testimonial";
        this.content = "Edit your old Testimonial for your site!";
      }
    } else {
      this.data = this.Testimonial;
    }
  }

  receiveRes(e:Testimonial) {
    // console.log(e);
    const formData = new FormData();
    formData.append("name", e.name);
    formData.append("message", e.message);
    formData.append("rating", e.rating);
    formData.append("admin_approval", e.admin_approval.toString());
    formData.append("userToken", this.gData.getToken());
    formData.append("img", e.img);
    if (Array.isArray(e.img)) {
      formData.append("img", e.img[0], "Testimonial."+e.img[0].name.split('.').pop());
    }
    if (e.id) {
      formData.append("id", e.id.toString());
      formData.append("pre_img", this.pre_img);
      formData.append("pre_src", this.pre_src);
      this.updateTestimonial(formData);
    } else {
      this.createTestimonial(formData);
    }
  }

  createTestimonial(formData: any) {
    this.api.createTestimonial(formData).subscribe((res: res) => {
      console.log('create',res.status);
      if (res.status) {
        this.gData.success = res;
        this.router.navigate(["/admin/testimonial/list"]);
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
  updateTestimonial(formData: any) {
    this.api.updateTestimonial(formData).subscribe((res:res) => {
        if (res.status) {
          this.gData.success = res;
          this.router.navigate(['/admin/testimonial/list']);
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
        //this.router.navigate(["/admin/Testimonialslist"]);
      },
    )
  }
}

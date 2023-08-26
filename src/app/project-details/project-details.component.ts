import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { err_handle, Productinformation, ProjectList, res, user } from '../model/productinformation';
import { ApiService } from '../_service/api.service';
import { GlobalService } from '../_service/global.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {

  @ViewChild('interestElement') 
  interestElement!: ElementRef;
  projectdetails: ProjectList | undefined;
  salePrice: number = 0;
  base: string = environment.backend;
  orderId: string = "";

  submitButton = {
    text: "I am Interested"
  }

  interest: boolean | null = false;
  Data: user | undefined;
  user: user= {
    name: "",
    email: "",
    mobile: "",
    password: '',
    role: 'user'
  }
  Initialuser: user= {
    name: "",
    email: "",
    mobile: "",
    password: '',
    role: 'user'
  }
  cus_err: err_handle = {
    status: null,
    msg: ""
  };

  userPurchased: boolean |null = false;

  constructor(private route: ActivatedRoute,private router:Router, private gData:GlobalService, private api:ApiService,private renderer: Renderer2) { }

  ngOnInit(): void {
    let slug = this.route.snapshot.params['projectname'];
    this.loadProjectData(slug);
  }

  async loadProjectData(slug: string) {
    let response = await this.api.getProjectBySlug(slug).toPromise();
    if (response.status) {
      this.checkPurchased(response.response.id);
      // price = originalAmount - (discountPercentage/100 * originalAmount)
      this.salePrice = response.response.price - (response.response.discount/100 * response.response.price);
      response.response.created_at = this.gData.changeDateformat(response.response.created_at);
      this.projectdetails = response.response;
      this.loadBreadcrumbs(this.projectdetails);
    }
  }

  checkPurchased(id: string) {
    let token = this.gData.getToken();
    this.api.checkPurchased(token, id).subscribe((res:any) => {
      this.userPurchased = res.status;
      this.orderId = res.success;
      // console.log(res);
    })
  }

  async createOrder() {
    if (this.gData.isAuth()) {
      let user = await this.api.getUser();
      if (this.projectdetails && user.id) {
        this.api.createOrder({user_id: user.id, slug: this.projectdetails.slug}).subscribe((res:res) => {
          if(res.status) {
            this.router.navigate(["/payment/"+this.projectdetails?.slug+"/"+res.success]);
          } else {
            this.gData.failure.status = true;
            this.gData.failure.message = res.message;
            this.router.navigate(["/login"]);
          }
        })
      }
    } else {
      this.gData.failure.status = true;
      this.gData.failure.message = "Register or Login inorder to make a purchase!";
      this.router.navigate(["/login"]);
    }
  }

  loadBreadcrumbs(projectDetails:any) {
    this.gData.Breadcrumbs.sub_div3.name = projectDetails.title;
    this.gData.Breadcrumbs.sub_div3.route = this.gData.Breadcrumbs.sub_div2.route;
  }

  paymentPage() {
    this.router.navigate(["/payment/"+this.projectdetails?.slug+"/"+this.orderId]);
  }

  async changeInterest() {
    this.interest = true;
    let user = await this.api.getUser();
    if(user) {
      this.Data = user;
    } else {
      this.Data = this.Initialuser;
    }
  }
  receiveRes(res:any) {
    console.log("console from project details!");
    console.log(res);
    //return;
    //this.submitButton.text = "";
    // this.interest = null;
    // console.log(this.interestElement.nativeElement)
    res.project_id = this.projectdetails?.id;
    this.api.sendInterestRequest(res).subscribe((response: any) => {
    this.interest = null;
      if (response.status) {
        const text = this.renderer.createText('Request Sent!');
        let h4 = this.renderer.createElement("h4");
        this.renderer.addClass(h4, "cus-g");
        this.renderer.appendChild(h4, text);
        this.renderer.appendChild(this.interestElement.nativeElement, h4);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: response.message,
        })
      }
      console.log(response);
    }, (err) => {
      this.interest = null;
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.error.message
      })
    })
  }

}

import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as fileSaver from 'file-saver';
import { ApiService } from 'src/app/_service/api.service';
import { GlobalService } from 'src/app/_service/global.service';
import { res } from '../../model/productinformation';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(private api:ApiService, public gData:GlobalService, private router: Router) { }

  Data: any[] = [];
  token: string = "";

  ngOnInit(): void {
    this.orders();
    this.gData.Breadcrumbs.sub_div3.name = "Orders";
    this.gData.Breadcrumbs.sub_div3.route = "/dashboard/orders";
  }
  async orders() {
    let user
    if (this.api.user) {
      user = this.api.user;
      this.token = this.api.user.user_token as string;
    } else {
      user = await this.api.getUser();
      this.token = user.user_token;
    }
    let response = await this.api.getordersForsingleUser(user.id as number, user.user_token).toPromise();
    if(response.status) {
      this.Data = response.success;
    }
  }

  getProjectReview(order_id: any) {
    let reviewData: any = {
      order_id: '',
      userToken: ''
    }
    reviewData.order_id = order_id;
    reviewData.userToken = this.token;
    this.api.getProjectReview(reviewData).subscribe((res:any) => {  
      if (res.status) {
        console.log(res.success);
        Swal.fire({
          title: '<strong>Review</strong>',
          // icon: 'info',
          html: 
          `<div class="container mt-3" style="margin-right: 0;">
            <div class="row mt-3"><div class="col-sm-6 text-start"><b>Project Name : </b></div><div class="col-sm-6 text-start">`+res.success.title+`</div></div>
            <div class="row mt-3"><div class="col-sm-6 text-start "><b>Rating : </b></div><div class="col-sm-6 text-start review-star">`+this.gData.showRatingInHtml(res.success.rating)+`</div></div>
            <div class="row mt-3"><div class="col-sm-6 text-start"><b>Message </b></div><div class="col-sm-6 text-start">`+res.success.message+`</div></div>
          </div>`,
          showCloseButton: true,
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: res.message,
        })
      }
    })
  }

  downloadSrcCode(id:number, filename: string, orderId: number) {
    filename = filename.toLowerCase().replace(" ", "-");
    this.api.getSourceFile(id, this.token, orderId).subscribe((res:any) => {
      let blob:any = new Blob([res], { type: "application/zip" });
      const url= window.URL.createObjectURL(blob);
      // window.open(url);
      fileSaver.saveAs(blob, filename+'.zip');
      this.orders();
    }, (err) => {
      if (err instanceof HttpErrorResponse && err.error instanceof Blob && err.error.type === "application/json") {
        let reader = new FileReader();
        reader.onload = (e: Event) => {
          this.gData.failure = JSON.parse((<any>e.target).result);
      };
      reader.readAsText(err.error);
      }
    })
  }
  downloadRequest(orderId: number) {
    this.api.projectDownloadRequest(this.token, orderId).subscribe((res: any) => {
        if (res.status) {
          this.gData.success = res;
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
      },
    )
  }

}

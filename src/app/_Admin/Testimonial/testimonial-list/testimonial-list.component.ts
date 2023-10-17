import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { buttonJSON, ProjectList, res } from 'src/app/model/productinformation';
import { ApiService } from 'src/app/_service/api.service';
import { GlobalService } from 'src/app/_service/global.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-testimonial-list',
  templateUrl: './testimonial-list.component.html',
  styleUrls: ['./testimonial-list.component.css']
})
export class TestimonialListComponent implements OnInit {
  button: buttonJSON = {
    Route: "/admin/testimonial/create",
    ButtonName: "Add Testimonial"
  }
  header: string[] = [];
  data: any[] = [];

  constructor(private api:ApiService, private router: Router, private gData:GlobalService) { }

  ngOnInit(): void {
    this.header = ["#", "Name", "Message", "Rating", "Status"];
    this.loadData();
    this.gData.Breadcrumbs.sub_div3.name = "Testimonials";
    this.gData.Breadcrumbs.sub_div3.route = "/admin/testimonial/list";
  }
  async loadData() {
    let token = this.gData.getToken();
    let proData = await this.api.getTestimonials(token).toPromise();
    this.data = proData.map((temp:any, key:number) => {
      let td1 =  key + 1;
      let td2 = temp.name;
      let td3 = temp.message;
      let td4 = {'star': this.gData.showRatingInHtml(temp.rating)}
      // let td4 = '<span class="review-star" [innerHTML]="this.gData.showRatingInHtml(value.rating)" width="10%"></span>'
      let td5 = temp.admin_approval? "Active": "Inactive";
      let dataArray = [td1, td2, td3, td4, td5];
      return {id: temp.id, dataArray: dataArray};
    });
  }

  receiveRes(e:any) {
    if(e.action == "edit") {
      this.router.navigate(["/admin/testimonial/edit/"+e.id]);
    } else if(e.action == "delete") {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this Testimonial!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          let data = {id: e.id, userToken: this.gData.getToken()}
          this.api.deleteTestimonial(data).subscribe((res:res) => {
            if (res.status) {
              Swal.fire(
                'Deleted!',
                'Your Testimonial has been deleted.',
                'success'
              )
              this.loadData();
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: res.message,
              })
            }
          })
          
        }
        //  else if(result.dismiss === Swal.DismissReason.cancel) {
        //   Swal.fire(
        //     "Safe!",
        //     "your Category is safe....",
        //     "info"
        //   )
        // }
      })
    }
  }

  receiveReportRes(e:any) {
    console.log('Receivereportres',e);
  }

}

import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ApiService } from 'src/app/_service/api.service';
import { GlobalService } from 'src/app/_service/global.service';
import { reports, paginationModel } from 'src/app/model/productinformation';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {
  ReportData: reports | undefined;
  Data: any[] = [];
  pagination: paginationModel;
  report: reports = {
    from_date: "",
    to_date: "",
  }

  constructor(public gData:GlobalService, private api:ApiService) { 
    this.pagination = this.gData.pagination;
  }

  ngOnInit(): void {
    this.ReportData = this.report = this.gData.report;
    this.gData.Breadcrumbs.sub_div3.name = "Feedbacks";
    this.gData.Breadcrumbs.sub_div3.route = "/admin/reviews";
    this.getProjectReviewList(this.report, this.pagination.page, this.pagination.itemsPerPage);
  }

  getProjectReviewList(data: any, page: number, itemsPerPage: number) {
    let token = this.gData.getToken();
    this.api.getProjectReviewList(data, token, page, itemsPerPage).subscribe((res:any) => {
      if (res.status) {
        this.Data = res.response;
      }
    });
  }

  getPageData(event: any) {
    this.pagination.page = event;
    this.getProjectReviewList(this.report, this.pagination.page, this.pagination.itemsPerPage);
  }

  giveApprove(id: number) {
    let token = localStorage.getItem("token");
    this.api.giveApprove({id:id, admin_approval:1, userToken: JSON.parse(token as string) }).subscribe((res:any) => {
      if(res.status) {
        Swal.fire({
          icon: 'success',
          title: 'Review Approval',
          text: "Review Approved!",
        }).then((result) => {
          this.getProjectReviewList(this.report, this.pagination.page, this.pagination.itemsPerPage);
        })
      } else {
        this.displayError(res.message);
      }
    }, (err) => {
       this.displayError(err.error.message);
    })
  }

  giveDisApprove(id: number) {
    let token = localStorage.getItem("token");
    this.api.giveApprove({id:id, admin_approval:0, userToken: JSON.parse(token as string) }).subscribe((res:any) => {
      if (res.status) {
        Swal.fire({
          icon: 'warning',
          title: 'Review Disapproval',
          text: "Review Disapproved!",
        }).then((result) => {
          this.getProjectReviewList(this.report, this.pagination.page, this.pagination.itemsPerPage);
        })

      } else {
        this.displayError(res.message);
      }
    }, (err) => {
      this.displayError(err.error.message);
    })
  }

  displayError(message: any) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
    });
  }

  receiveReportRes(data:any) {
    this.report = data;
    this.getProjectReviewList(this.report, this.pagination.page, this.pagination.itemsPerPage);
  }

}


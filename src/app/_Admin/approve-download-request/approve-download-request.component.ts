import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ApiService } from 'src/app/_service/api.service';
import { GlobalService } from 'src/app/_service/global.service';
import { reports, paginationModel } from 'src/app/model/productinformation';

@Component({
  selector: 'app-approve-download-request',
  templateUrl: './approve-download-request.component.html',
  styleUrls: ['./approve-download-request.component.css']
})
export class ApproveDownloadRequestComponent implements OnInit {
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
    this.gData.Breadcrumbs.sub_div3.name = "Download Requests";
    this.gData.Breadcrumbs.sub_div3.route = "/admin/approveDownloadRequestlist";
    this.getApproveRequests(this.report, this.pagination.page, this.pagination.itemsPerPage);
  }

  getApproveRequests(data: any, page: number, itemsPerPage: number) {
    let token = this.gData.getToken();
    this.api.getApproveRequestsByAdmin(data, token, page, itemsPerPage).subscribe((res:any) => {
      if(res.status) {
        this.Data = res.response;
      }
    });
  }

  getPageData(event: any) {
    this.pagination.page = event;
    this.getApproveRequests(this.report, this.pagination.page, this.pagination.itemsPerPage);
  }

  givePermission(id: number) {
    let token = localStorage.getItem("token");
    this.api.giveDownloadPermission({id:id, userToken: JSON.parse(token as string) }).subscribe((res:any) => {
      if(res.status) {
        Swal.fire({
          icon: 'success',
          title: 'Download Permission',
          text: "Permission Granted!",
        }).then((result) => {
          this.getApproveRequests(this.report, this.pagination.page, this.pagination.itemsPerPage);
        })

      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: res.message,
        })
      }
    }, (err) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.error.message,
      });
    })
  }

  receiveReportRes(data:any) {
    this.report = data;
    this.getApproveRequests(this.report, this.pagination.page, this.pagination.itemsPerPage);
  }

}

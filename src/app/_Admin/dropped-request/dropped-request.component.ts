import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_service/api.service';
import { GlobalService } from 'src/app/_service/global.service';
import { reports, paginationModel } from 'src/app/model/productinformation';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dropped-request',
  templateUrl: './dropped-request.component.html',
  styleUrls: ['./dropped-request.component.css']
})
export class DroppedRequestComponent implements OnInit {
  
  ReportData: reports | undefined;
  Data: any[] = [];
  pagination: paginationModel;
  report: reports = {
    from_date: "",
    to_date: "",
  }

  constructor(private gData:GlobalService, private api:ApiService) { 
    this.pagination = this.gData.pagination;
  }

  ngOnInit(): void {
    this.ReportData = this.report = this.gData.report;
    this.gData.Breadcrumbs.sub_div3.name = "Dropped Requests";
    this.gData.Breadcrumbs.sub_div3.route = "/admin/droppedRequestlist";
    this.getDroppedRequests(this.report, this.pagination.page, this.pagination.itemsPerPage);
  }

  getDroppedRequests(data: any, page: number, itemsPerPage: number) {
    let token = this.gData.getToken();
    this.api.getDroppedRequestsByAdmin(data, token, page, itemsPerPage).subscribe((res:any) => {
      if(res.status) {
        this.Data = res.response;
        this.pagination.totalRecCount = res.totalRecCount;
      }
    });
  }

  getPageData(event: any) {
    this.pagination.page = event;
    this.getDroppedRequests(this.report, this.pagination.page, this.pagination.itemsPerPage);
  }

  createUser(Dropped_id: number) {
    this.api.createUser({id:Dropped_id}).subscribe((res: any) => {
      if(res.status) {
        Swal.fire({
          icon: 'success',
          title: 'Completed',
          text: res.message,
        }).then((result) => {
          this.getDroppedRequests(this.report, this.pagination.page, this.pagination.itemsPerPage);
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
    this.getDroppedRequests(this.report, this.pagination.page, this.pagination.itemsPerPage);
  }

}

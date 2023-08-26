import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ApiService } from 'src/app/_service/api.service';
import { GlobalService } from 'src/app/_service/global.service';
import { reports, paginationModel } from 'src/app/model/productinformation';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {
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
    this.gData.Breadcrumbs.sub_div3.name = "Support Requests";
    this.gData.Breadcrumbs.sub_div3.route = "/admin/ticket/list";
    this.getProjectTicketList(this.report, this.pagination.page, this.pagination.itemsPerPage);
  }

  getProjectTicketList(data: any, page: number, itemsPerPage: number) {
    let token = this.gData.getToken();
    this.api.getProjectTicketList(data, token, page, itemsPerPage).subscribe((res:any) => {
      if(res.status) {
        this.Data = res.response;
      }
    });
  }

  getPageData(event: any) {
    this.pagination.page = event;
    this.getProjectTicketList(this.report, this.pagination.page, this.pagination.itemsPerPage);
  }

  closeTicket(id: number) {
    let token = localStorage.getItem("token");
    this.api.closeTicket({id:id, is_completed:1, userToken: JSON.parse(token as string) }).subscribe((res:any) => {
      if(res.status) {
        Swal.fire({
          icon: 'success',
          title: 'Support Request Status',
          text: "Support Request is closed!",
        }).then((result) => {
          this.getProjectTicketList(this.report, this.pagination.page, this.pagination.itemsPerPage);
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
    this.getProjectTicketList(this.report, this.pagination.page, this.pagination.itemsPerPage);
  }

}


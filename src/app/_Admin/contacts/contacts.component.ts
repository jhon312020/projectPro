import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_service/api.service';
import { GlobalService } from 'src/app/_service/global.service';
import { environment } from 'src/environments/environment';
import { backPage, paginationModel, reports } from 'src/app/model/productinformation';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  ReportData: reports | undefined;
  report: reports = {
    from_date: "",
    to_date: "",
  }

  Data: any[] = [];
  pagination: paginationModel;
  BackPage : backPage = {
    label: "",
    route: "",
  };
  constructor(private gData:GlobalService, private api:ApiService) { 
    this.pagination = this.gData.pagination;
    this.BackPage.label = this.gData.Breadcrumbs.sub_div2.name;
    this.BackPage.route = this.gData.Breadcrumbs.sub_div2.route;
  }

  ngOnInit(): void {
    this.ReportData = this.report = this.gData.report;
    this.gData.Breadcrumbs.sub_div3.name = "Contacts";
    this.gData.Breadcrumbs.sub_div3.route = "/admin/contacts";
    this.getContactList(this.report, this.pagination.page, this.pagination.itemsPerPage);
  }

  getContactList(data: any, page: number, itemsPerPage: number) {
    let token = this.gData.getToken();
    this.api.getContactList(data, token, page, itemsPerPage).subscribe((res:any) => {
      if (res.status) {
        this.Data = res.response;
        this.pagination.totalRecCount = res.totalRecCount;
      }
    });
  }

  getPageData(event: any) {
    this.pagination.page = event;
    this.getContactList(this.report, this.pagination.page, this.pagination.itemsPerPage);
  }

  receiveReportRes(data:any) {
    this.report = data;
    this.getContactList(this.report, this.pagination.page, this.pagination.itemsPerPage);
  }

}

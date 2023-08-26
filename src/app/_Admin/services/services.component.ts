import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_service/api.service';
import { GlobalService } from 'src/app/_service/global.service';
import { reports, paginationModel } from 'src/app/model/productinformation';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
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
    this.gData.Breadcrumbs.sub_div3.name = "Enquiry Requests";
    this.gData.Breadcrumbs.sub_div3.route = "/admin/service";
    this.getServiceList(this.report, this.pagination.page, this.pagination.itemsPerPage);
  }

  getServiceList(data: any, page: number, itemsPerPage: number) {
    let token = this.gData.getToken();
    this.api.getServiceList(data, token, page, itemsPerPage).subscribe((res:any) => {
      if (res.status) {
        this.Data = res.response;
        this.pagination.totalRecCount = res.totalRecCount;
      }
    });
  }

  getPageData(event: any) {
    this.pagination.page = event;
    this.getServiceList(this.report, this.pagination.page, this.pagination.itemsPerPage);
  }

  titleCaseWord(word: string) {
    if (!word) return word;
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  }

  receiveReportRes(data:any) {
    this.report = data;
    this.getServiceList(this.report, this.pagination.page, this.pagination.itemsPerPage);
  }

}

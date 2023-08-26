import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { reports } from 'src/app/model/productinformation';
import { ApiService } from 'src/app/_service/api.service';
import { GlobalService } from 'src/app/_service/global.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  baseRoute: string = "/admin/";

  OrdersCount: number = 0;
  OfflineOrdersCount: number = 0;
  InterestRequestCount: number = 0;
  DroppedRequestCount: number = 0;
  DownloadApprovalCount: number = 0;
  ContactCount: number = 0;
  ServiceCount: number = 0;
  today: any;
  showResult: boolean = false; 
  submitted: {status: boolean, showLoader: boolean} = {
    status: false,
    showLoader: false
  }
 
  ReportForm: FormGroup = new FormGroup({});

  @Input() data : reports | undefined;

  report: reports = {
    from_date: "",
    to_date: "",
  }

  constructor(private api:ApiService, private gData: GlobalService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.gData.clearBreadcrumbs();
    this.gData.Breadcrumbs.sub_div2.name = "Reports";
    this.gData.Breadcrumbs.sub_div2.route = "/admin/reports";
  }

  getReportCount(formDataObj: any) {
    this.submitted.showLoader = true;
    let token = this.gData.getToken();
    this.api.getReportDashboardCount(formDataObj, token).subscribe((res: any) => {
      this.submitted.showLoader = false;
      this.showResult = true;
      if (res.status) {
        this.submitted.status = false;
        this.OrdersCount = res.success.order;
        this.OfflineOrdersCount = res.success.offlineorder;
        this.InterestRequestCount = res.success.interestedRequest;
        this.DroppedRequestCount = res.success.droppedRequest;
        this.DownloadApprovalCount = res.success.approvalRequest;
        this.ContactCount = res.success.contactCount;
        this.ServiceCount = res.success.serviceCount;
      } else {
        this.gData.failure.status = true;
        this.gData.failure.message = res.message;
      }
    },
      (err: any) => {
        this.submitted.showLoader = false;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
        });
      },
    )
  } 

  receiveReportRes(e:any) {
    this.getReportCount(e);
  }

}

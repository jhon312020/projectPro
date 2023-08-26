import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_service/api.service';
import { GlobalService } from 'src/app/_service/global.service';
import { reports, paginationModel } from 'src/app/model/productinformation';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adminofflineorders',
  templateUrl: './adminofflineorders.component.html',
  styleUrls: ['./adminofflineorders.component.css']
})
export class AdminofflineordersComponent implements OnInit {
  ReportData: reports | undefined;
  Data: any[] = [];
  formData: any[] = [];
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
    this.gData.Breadcrumbs.sub_div3.name = "Offline Orders";
    this.gData.Breadcrumbs.sub_div3.route = "/admin/offlineorderslist";
    this.getOrders(this.report, this.pagination.page, this.pagination.itemsPerPage);
  }

  getOrders(data: any, page: number, itemsPerPage: number) {
    let token = this.gData.getToken();
    this.api.getofflineOrdersByAdmin(data, token, page, itemsPerPage).subscribe((res:any) => {
      if(res.status) {
        this.Data = res.response;
        this.pagination.totalRecCount = res.totalRecCount;
      }
    });
  }

  getPageData(event: any) {
    this.pagination.page = event;
    this.getOrders(this.report, this.pagination.page, this.pagination.itemsPerPage);
  }

  receiveReportRes(data:any) {
    this.report = data;
    this.getOrders(this.report, this.pagination.page, this.pagination.itemsPerPage);
  }

  showOrderDetails(index: number) {
    let actual_price = this.Data[index].project_price - (this.Data[index].discount/100 * this.Data[index].project_price);
    let discount = this.Data[index].discount ? this.Data[index].discount+"%" : "0%";
    Swal.fire({
      title: '<strong>Order Detail</strong>',
      // icon: 'info',
      html: 
      `<div class="row mt-3" style="margin-right: 0;">
        <div class="col-sm-6 text-start"><b>Name : </b></div><div class="col-sm-6 text-start">`+this.Data[index].name+`</div>
        <div class="col-sm-6 text-start"><b>Mobile No. : </b></div><div class="col-sm-6 text-start">`+this.Data[index].mobile+`</div>
        <div class="col-sm-6 text-start"><b>Email : </b></div><div class="col-sm-6 text-start">`+this.Data[index].email+`</div>
        <div class="col-sm-6 text-start"><b>Project Name : </b></div><div class="col-sm-6 text-start">`+this.Data[index].title+`</div>
        <div class="col-sm-6 text-start"><b>Project Price : </b></div><div class="col-sm-6 text-start">`+this.Data[index].project_price+`</div>
        <div class="col-sm-6 text-start"><b>Discount Percentage : </b></div><div class="col-sm-6 text-start">`+discount+`</div>
        <div class="col-sm-6 text-start"><b>Actual Price : </b></div><div class="col-sm-6 text-start">`+actual_price+`/-</div>
        <div class="col-sm-6 text-start"><b>Purchase info : </b></div><div class="col-sm-6 text-start">`+this.Data[index].paid_hint+`</div>
        <div class="col-sm-6 text-start"><b>Purchase date : </b></div><div class="col-sm-6 text-start">`+this.gData.changeDateformat(this.Data[index].updated_at)+`</div>
      </div>`,
      // showCloseButton: true,
      // showDenyButton: true,
      // showCancelButton: true,
      // focusConfirm: false,
      confirmButtonText: 'Ok',
        // '<i class="fa fa-thumbs-up"></i> Great!',
      confirmButtonAriaLabel: 'ok!',
      cancelButtonText: 'Cancel',
      // '<i class="fa fa-thumbs-down"></i>',
      cancelButtonAriaLabel: 'cancel!'
    })
  }

}

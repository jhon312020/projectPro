import { Component, OnInit} from '@angular/core';
import { ApiService } from 'src/app/_service/api.service';
import { GlobalService } from 'src/app/_service/global.service';
import { reports, paginationModel } from 'src/app/model/productinformation';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adminorders',
  templateUrl: './adminorders.component.html',
  styleUrls: ['./adminorders.component.css']
})
export class AdminordersComponent implements OnInit {
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
    this.gData.Breadcrumbs.sub_div3.name = "Online Orders";
    this.gData.Breadcrumbs.sub_div3.route = "/admin/orderslist";
    this.getOrders(this.report, this.pagination.page, this.pagination.itemsPerPage);
  }

  getOrders(data: any, page: number, itemsPerPage: number) {
    let token = this.gData.getToken();
    this.api.getOrdersByAdmin(data, token, page, itemsPerPage).subscribe((res:any) => {
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

  showOrderDetails(index: number) {
    let actual_price = this.Data[index].project_price - (this.Data[index].discount/100 * this.Data[index].project_price);
    let discount = this.Data[index].discount ? this.Data[index].discount+"%" : "0%";
    let expire = this.Data[index].expire ? this.gData.changeDateformat(this.Data[index].expire) : "-";
    let purchase = this.Data[index].expire ? this.gData.changeDateformat(this.Data[index].updated_at) : "-";
    let download_date = this.Data[index].download_date ? this.gData.changeDateformat(this.Data[index].download_date) : "-";
    let support_date = this.Data[index].ticket_date ? this.gData.changeDateformat(this.Data[index].ticket_date) : "-";
    let grant_date = this.Data[index].updated_at ? this.gData.changeDateformat(this.Data[index].updated_at) : "-";
    let completed_status = '-';
    if (support_date != '-') {
      completed_status = this.Data[index].completed ? "Completed" : "Not Completed";
    }
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
        <div class="col-sm-6 text-start"><b>Purchase date : </b></div><div class="col-sm-6 text-start">`+purchase+`</div>
        <div class="col-sm-6 text-start"><b>Expire date : </b></div><div class="col-sm-6 text-start">`+expire+`</div>
        <div class="col-sm-6 text-start"><b>Download Permission Granted Date : </b></div><div class="col-sm-6 text-start">`+grant_date+`</div>
        <div class="col-sm-6 text-start"><b>Downloaded date : </b></div><div class="col-sm-6 text-start">`+download_date+`</div>
        <div class="col-sm-6 text-start"><b>Support date & status : </b></div><div class="col-sm-6 text-start">`+support_date+` & `+completed_status+`</div>
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
  receiveReportRes(data:any) {
    this.report = data;
    this.getOrders(this.report, this.pagination.page, this.pagination.itemsPerPage);
  }

}

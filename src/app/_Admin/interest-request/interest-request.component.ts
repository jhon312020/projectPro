import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_service/api.service';
import { GlobalService } from 'src/app/_service/global.service';
import { reports, paginationModel } from 'src/app/model/productinformation';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-interest-request',
  templateUrl: './interest-request.component.html',
  styleUrls: ['./interest-request.component.css']
})
export class InterestRequestComponent implements OnInit {
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
    this.gData.Breadcrumbs.sub_div3.name = "Requests";
    this.gData.Breadcrumbs.sub_div3.route = "/admin/interestRequestlist";
    this.getInterestRequests(this.report, this.pagination.page, this.pagination.itemsPerPage);
  }

  getInterestRequests(data: any, page: number, itemsPerPage: number) {
    let token = this.gData.getToken();
    this.api.getInterestRequestsByAdmin(data, token, page, itemsPerPage).subscribe((res:any) => {
      if(res.status) {
        this.Data = res.response;
        this.pagination.totalRecCount = res.totalRecCount;
      }
    });
  }

  getPageData(event: any) {
    this.pagination.page = event;
    this.getInterestRequests(this.report, this.pagination.page, this.pagination.itemsPerPage);
  }

  takeAction(i: number) {
    let token = localStorage.getItem('token');
    // price = originalAmount - (discountPercentage/100 * originalAmount)
    let actual_price = this.Data[i].project.price - (this.Data[i].project.discount/100 * this.Data[i].project.price);
    let discount = this.Data[i].project.discount ? this.Data[i].project.discount+"%" : "0%";
    Swal.fire({
      title: '<strong>Request Detail</strong>',
      // icon: 'info',
      html: 
      `<div class="row mt-3" style="margin-right: 0;">
        <div class="col-sm-6 text-start"><b>Name : </b></div><div class="col-sm-6 text-start">`+this.Data[i].name+`</div>
        <div class="col-sm-6 text-start"><b>Mobile No. : </b></div><div class="col-sm-6 text-start">`+this.Data[i].mobile+`</div>
        <div class="col-sm-6 text-start"><b>Email : </b></div><div class="col-sm-6 text-start">`+this.Data[i].email+`</div>
        <div class="col-sm-6 text-start"><b>Project Name : </b></div><div class="col-sm-6 text-start">`+this.Data[i].project.title+`</div>
        <div class="col-sm-6 text-start"><b>Price : </b></div><div class="col-sm-6 text-start">`+this.Data[i].project.price+`</div>
        <div class="col-sm-6 text-start"><b>Discount : </b></div><div class="col-sm-6 text-start">`+discount+`</div>
        <div class="col-sm-6 text-start"><b>Actual Price : </b></div><div class="col-sm-6 text-start">`+actual_price+`/-</div>
      </div>`,
      // showCloseButton: true,
      showDenyButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: 'Send Payment Request!',
        // '<i class="fa fa-thumbs-up"></i> Great!',
      confirmButtonAriaLabel: 'Payment Request!',
      denyButtonText: 'Drop This Request',
        // '<i class="fa fa-thumbs-down"></i>',
        denyButtonAriaLabel: 'Drop Request',
      cancelButtonText: 'Paid',
      // '<i class="fa fa-thumbs-down"></i>',
      cancelButtonAriaLabel: 'Paid!',
      showLoaderOnConfirm: true,
    }).then((result) => {
      if(result.isConfirmed) {
        // console.log("create user?");
        Swal.fire({
          icon: 'success',
          title: 'Please wait, Sending Payment Request Email to User',
          showConfirmButton: false,
        })
        this.api.sendPaymentRequest({id:this.Data[i].id}).subscribe((res:any) => {
          if(res.status) {
            this.gData.success = res;
            this.getInterestRequests(this.report, this.pagination.page, this.pagination.itemsPerPage);
          } else {
            this.gData.failure.status = true;
            this.gData.failure.message = res.message;
          }
          Swal.close();
        })
      } else if(result.isDenied) {
        Swal.fire({
            title: 'Reason',
            input: 'textarea',
            inputAttributes: {
              autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Update',
            showLoaderOnConfirm: true,
            preConfirm: (login) => {
              return login
            },
            allowOutsideClick: () => !Swal.isLoading()
          }).then((rejectResult) => {
            if(rejectResult.isConfirmed) {
              // console.log(rslt.value);
              this.api.updateInterestRequest({id:this.Data[i].id, userToken: JSON.parse(token as string), reject_reason: rejectResult.value}).subscribe((res:any) => {
                if(res.status) {
                  this.gData.success = res;
                  this.getInterestRequests(this.report, this.pagination.page, this.pagination.itemsPerPage);
                } else {
                  this.gData.failure.status = true;
                  this.gData.failure.message = res.message;
                }
              })
            }
        })
        
        // console.log("waste of time!");
      } else {
        if(result.dismiss && result.dismiss.toString() == "cancel") {
          Swal.fire({
            title: 'Offline Payment',
            input: 'textarea',
            inputAttributes: {
              autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Update',
            showLoaderOnConfirm: true,
            preConfirm: (login) => {
              return login
            },
            allowOutsideClick: () => !Swal.isLoading()
          }).then((rslt) => {
            if(rslt.isConfirmed) {
              // console.log(rslt.value);
              this.api.updateInterestRequest({id:this.Data[i].id, userToken: JSON.parse(token as string), paid: rslt.value}).subscribe((res:any) => {
                if(res.status) {
                  this.gData.success = res;
                  this.getInterestRequests(this.report, this.pagination.page, this.pagination.itemsPerPage);
                } else {
                  this.gData.failure.status = true;
                  this.gData.failure.message = res.message;
                }
              })
            }
          })
        }
        // console.log("just viewd");
      }
    })
    // console.log(this.Data[i]);
  }
  
  createUser(interest_id: number) {
    this.api.createUser({id:interest_id}).subscribe((res: any) => {
      if(res.status) {
        Swal.fire({
          icon: 'success',
          title: 'Completed',
          text: res.message,
        }).then((result) => {
          this.getInterestRequests(this.report, this.pagination.page, this.pagination.itemsPerPage);
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
    this.getInterestRequests(this.report, this.pagination.page, this.pagination.itemsPerPage);
  }
}

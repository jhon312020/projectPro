import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_service/api.service';
import { GlobalService } from 'src/app/_service/global.service';

@Component({
  selector: 'app-admin-content',
  templateUrl: './admin-content.component.html',
  styleUrls: ['./admin-content.component.css']
})
export class AdminContentComponent implements OnInit {

  baseRoute: string = "/admin/";

  ordersCount: number = 0;
  offlineOrdersCount: number = 0;
  usersCount: number = 0;
  categoriesCount: number = 0;
  projectsCount: number = 0;
  interestRequestCount: number = 0;
  droppedRequestCount: number = 0;
  downloadApprovalCount: number = 0;
  contactCount: number = 0;
  serviceCount: number = 0;
  blogCount: number = 0;
  reviewCount: number = 0;
  supportCount: number = 0;

  constructor(private api:ApiService, private gData: GlobalService) { }

  ngOnInit(): void {
    this.getCounts();
    this.gData.clearBreadcrumbs();
    this.gData.Breadcrumbs.sub_div2.name = "Dashboard";
    this.gData.Breadcrumbs.sub_div2.route = "/admin";
  }

  getCounts() {
    this.api.getadminCounts(this.gData.getToken()).subscribe((res: any) => {
      if (res.status) {
        this.ordersCount = res.success.order;
        this.offlineOrdersCount = res.success.offlineorder;
        this.usersCount = res.success.user;
        this.categoriesCount = res.success.category;
        this.projectsCount = res.success.project;
        this.interestRequestCount = res.success.interestedRequest;
        this.droppedRequestCount = res.success.droppedRequest;
        this.downloadApprovalCount = res.success.approvalRequest;
        this.contactCount = res.success.contactCount;
        this.serviceCount = res.success.serviceCount;
        this.blogCount = res.success.blogCount;
        this.reviewCount = res.success.reviewCount;
        this.supportCount = res.success.supportCount;
        this.api.AdminCounts = res.success;
        // console.log(res.success);
      }
    });
  }


}

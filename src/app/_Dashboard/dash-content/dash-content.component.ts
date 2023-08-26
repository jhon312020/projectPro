import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/_service/api.service';
import { GlobalService } from 'src/app/_service/global.service';

@Component({
  selector: 'app-dash-content',
  templateUrl: './dash-content.component.html',
  styleUrls: ['./dash-content.component.css']
})
export class DashContentComponent implements OnInit {

  constructor(private api:ApiService, public gData:GlobalService, private router: Router) { }

  ordersCount: number = 0;
  transactionsCount: number = 0;
  downloadCount: number = 0;

  ngOnInit(): void {
    this.getCounts();
    this.gData.clearBreadcrumbs();
    this.gData.Breadcrumbs.sub_div2.name = "Dashboard";
    this.gData.Breadcrumbs.sub_div2.route = "/dashboard";
  }
  getCounts() {
    let token = this.gData.getToken();
    this.api.getdashboardCounts(token).subscribe((res:any) => {
      if(res.status) {
        this.ordersCount = res.success.orders;
        this.transactionsCount = res.success.transactions;
        this.downloadCount = res.success.downloads;
      }
    })
  }

  gotoOders() {
    this.router.navigate(['/dashboard/orders']);
  }

}

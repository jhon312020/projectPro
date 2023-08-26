import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/_service/api.service';
import { GlobalService } from '../../_service/global.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public gData: GlobalService,private api: ApiService, private router:Router) { 
  }

  ngOnInit(): void {
    this.gData.clearBreadcrumbs();
    this.gData.Breadcrumbs.sub_div2.name = "Dashboard";
    this.gData.Breadcrumbs.sub_div2.route = "/dashboard";
    if (!this.gData.isAuth()) {
      this.router.navigate(['/login']);
    }
    // this.is_admin();
  }

  async is_admin() {
    if(this.api.user) {
      if(this.api.user.role == "admin") {
        this.router.navigate(["/admin"]);
      }
    } else {
      let user = await this.api.getUser();
      if(user.role == "admin") {
        this.router.navigate(["/admin"]);
      }
    }
    
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/_service/api.service';
import { GlobalService } from 'src/app/_service/global.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private api:ApiService, private router:Router, public gData:GlobalService) { }

  ngOnInit(): void {
    if (!this.gData.isAuth()) {
      this.router.navigate(['/login']);
    }
    this.is_admin();
    this.gData.clearBreadcrumbs();
    this.gData.Breadcrumbs.sub_div2.name = "Dashboard";
    this.gData.Breadcrumbs.sub_div2.route = "/admin";
  }
  async is_admin() {
    if (this.api.user) {
      if(this.api.user.role != "admin") {
        this.router.navigate(["/access-denied"]);
      }
    } else {
      let user = await this.api.getUser();
      if(user.role != "admin") {
        this.router.navigate(["/access-denied"]);
      }
    }
    
  }

}

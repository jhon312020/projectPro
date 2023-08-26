import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../_service/global.service';
import { ApiService } from 'src/app/_service/api.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: boolean = false;
  welcomeName: string | undefined;
  contactAdmin = {
    email: "",
    mobile_number: "",
  }

  constructor(public gData: GlobalService, private api:ApiService, private router: Router,) {}

  ngOnInit(): void {
    this.loadCategory();
    this.defineRoute();
    this.contactAdmin.email = environment.email;
    this.contactAdmin.mobile_number = environment.mobile_number;
  }
  ngDoCheck() {
    this.user = this.gData.isAuth();
    if (this.user) {
      if (this.api.user) {
        this.welcomeName = this.api.user.name;
      } 
    }
  }
  async defineRoute() {
    // console.log("hello");
    this.api.user = await this.api.getUser();
    if (this.api.user?.role == "admin" || this.api.user?.role == "staff") {
      this.gData.AdminOrUser = "/admin";
    } else {
      this.gData.AdminOrUser = "/dashboard";
    }
  }
  async loadCategory() {
    if(!this.gData.Category?.length) {
      this.gData.Category = await this.api.getActiveCategories().toPromise();
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    this.api.user = undefined;
  }

}

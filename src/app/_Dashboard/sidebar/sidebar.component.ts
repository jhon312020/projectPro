import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/_service/api.service';
import { GlobalService } from '../../_service/global.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  user: boolean = false;
  admin: boolean = false;
  adminUrl: string = "/admin/";
  loggedUserName: string = 'Menu';

  constructor(private gData: GlobalService, private router: Router, private api:ApiService) { 
  }

  ngOnInit():void {
    this.user = this.gData.isAuth();
    if (this.user) {
      if (this.api.user) {
        if(this.api.user.role == "admin") {
          this.admin = true;
        }
      } else {
        this.is_admin();
      }
    }
  }

  ngDoCheck() {
    this.user = this.gData.isAuth();
    if (this.user) {
      if (this.api.user) {
        this.loggedUserName = this.api.user.name;
      } 
    }
  }

  async is_admin() {
    let logPerson = await this.api.getUser();
    if (logPerson.role == "admin") {
      this.admin = true;
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('welcomeName');
    this.router.navigate(['/login']);
    this.api.user = undefined;
  }
}

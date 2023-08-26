import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { buttonJSON } from 'src/app/model/productinformation';
import { GlobalService } from 'src/app/_service/global.service';
import { backPage } from 'src/app/model/productinformation';
import { ApiService } from 'src/app/_service/api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @Input() Data: any[] | undefined;
  @Input() Header: string[] | undefined;
  @Input() Button: buttonJSON = {
    Route: "",
    ButtonName: ""
  };
  BackPage : backPage = {
    label: "Dashboard",
    route: "/dashboard",
  };
  @Output() sendRes: EventEmitter<any> = new EventEmitter<any>();
  page: number = 1;
  totalHeaders = 1;
  constructor(private api:ApiService, private gData: GlobalService) {
  }

  ngOnInit(): void {
    if (this.Header !== undefined) {
      this.totalHeaders = this.Header.length + 1;
    }
    if (this.gData.Breadcrumbs.sub_div2.name) {
      this.BackPage.label = this.gData.Breadcrumbs.sub_div2.name;
      this.BackPage.route = this.gData.Breadcrumbs.sub_div2.route;
    } else {
      if (this.api.user) {
        if(this.api.user.role == "admin") {
          this.BackPage.route = "/admin"
        }
      }
    }
  }

  actionTrigger(res: any) {
    this.sendRes.emit(res) ;
  }
}

import { Component, OnInit } from '@angular/core';
import { ApiService } from './_service/api.service';
import { GlobalService } from './_service/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private gData: GlobalService, private api: ApiService) {}

  ngOnInit():void {
    // this.gData.clearBreadcrumbs();
    // console.log("hello");
    // this.gData.Category = await this.api.listCategory().toPromise();
    // console.log(this.gData.Category);
  }

  onActivate() {
    window.scroll(0, 0);
  }
}

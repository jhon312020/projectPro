import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../_service/global.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private gData:GlobalService) { }

  ngOnInit(): void {
    this.gData.clearBreadcrumbs();
    this.gData.Breadcrumbs.sub_div2.name = "About Us";
    this.gData.Breadcrumbs.sub_div2.route = "about";
  }

}

import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../_service/global.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  constructor(private gData:GlobalService) { }

  ngOnInit(): void {
    this.gData.clearBreadcrumbs();
    this.gData.Breadcrumbs.sub_div2.name = "Team";
  }

}

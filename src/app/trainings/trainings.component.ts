import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/_service/global.service';
import { ApiService } from 'src/app/_service/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.css']
})
export class TrainingsComponent implements OnInit {

  constructor(private api:ApiService, public gData:GlobalService, private activeRoute:ActivatedRoute) { }
  public serviceFormInfo = {
    title: 'Training Enquiry Form',
    categoryLabel: 'Training Technology Domain',
    collegeInfo: '(Optional)'
  }
  public bestWishes = environment.best_wishes;
  ngOnInit(): void {
    this.gData.clearBreadcrumbs();
    this.gData.Breadcrumbs.sub_div2.name = "Trainings";
    this.gData.Breadcrumbs.sub_div2.route = "trainings";
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/_service/global.service';
import { ApiService } from 'src/app/_service/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-internships',
  templateUrl: './internships.component.html',
  styleUrls: ['./internships.component.css']
})
export class InternshipsComponent implements OnInit {

  constructor(private api:ApiService, public gData:GlobalService, private activeRoute:ActivatedRoute) { }
  public serviceFormInfo = {
    title: 'Internship Enquiry Form',
    categoryLabel: 'Project Domain for Internship',
    collegeInfo: '(Optional)'
  }
  public bestWishes = environment.best_wishes;
  ngOnInit(): void {
    this.gData.clearBreadcrumbs();
    this.gData.Breadcrumbs.sub_div2.name = "Internships";
    this.gData.Breadcrumbs.sub_div2.route = "internships";
  }

}

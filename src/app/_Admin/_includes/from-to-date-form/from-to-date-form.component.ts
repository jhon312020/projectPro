import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { reports, backPage } from 'src/app/model/productinformation';
import { ApiService } from 'src/app/_service/api.service';
import { GlobalService } from 'src/app/_service/global.service';
import { environment } from 'src/environments/environment';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-from-to-date-form',
  templateUrl: './from-to-date-form.component.html',
  styleUrls: ['./from-to-date-form.component.css']
})
export class FromToDateFormComponent implements OnInit {

  baseRoute: string = "/admin/";

  today: any;
  showResult: boolean = false; 
  submitted: {status: boolean, showLoader: boolean} = {
    status: false,
    showLoader: false
  }
 
  ReportForm: FormGroup = new FormGroup({});

  @Input() FromToData : reports = {
    from_date: "",
    to_date: "",
  };
  BackPage : backPage = {
    label: "Dashboard",
    route: "",
  };
  @Output() sendRes: EventEmitter<any> = new EventEmitter<any>();

  report: reports = {
    from_date: "",
    to_date: "",
  }

  constructor(private api:ApiService, private gData: GlobalService, private fb: FormBuilder) {
    // this.BackPage.label = "Dashboard";
    // this.BackPage.url = environment.admin_dashboard;
    this.BackPage.label = this.gData.Breadcrumbs.sub_div2.name;
    this.BackPage.route = this.gData.Breadcrumbs.sub_div2.route;
  }

  async ngOnInit() {
    this.baseRoute = environment.admin_dashboard;
    if (this.FromToData) {
      this.report.from_date = this.FromToData.from_date;
      this.report.to_date = this.FromToData.to_date;
    }
    this.validating();
  }

  validating() {
    this.ReportForm = this.fb.group({
      from_date: [this.report.from_date, Validators.required],
      to_date: [this.report.to_date, Validators.required],
    });
  }
  get formData(){
    return this.ReportForm.controls;
  }

  onSubmit() {
    this.submitted.status = true;
    if (this.ReportForm.valid) {
      this.report.from_date = this.formData['from_date'].value;
      this.report.to_date = this.formData['to_date'].value;
      this.gData.report = this.report;
      const formDataObj = new FormData();
      formDataObj.append("from_date", this.report.from_date);
      formDataObj.append("to_date", this.report.to_date);
      this.sendRes.emit(formDataObj) ;
    }
  }

}

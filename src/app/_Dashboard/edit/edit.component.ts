import { Component, OnInit } from '@angular/core';
import { err_handle, user } from '../../model/productinformation';
import { ApiService } from '../../_service/api.service';
import { GlobalService } from '../../_service/global.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  // editForm: FormGroup = new FormGroup({});
  Data: user | undefined;
  cus_err: err_handle = {
    status: null,
    msg: ""
  };


  user: user= {
    name: "",
    email: "",
    mobile: "",
    role: 'user'
  }

  Initialuser: user= {
    name: "",
    email: "",
    mobile: "",
    role: 'user'
  }

  constructor(private api: ApiService, private gData: GlobalService) { 

  }

  ngOnInit(): void {
    this.loadData();
    this.gData.Breadcrumbs.sub_div3.name = "Edit";
    this.gData.Breadcrumbs.sub_div3.route = "/dashboard/edit";
  }

  async loadData() {
    let user = await this.api.getUser();
    this.Data = user;
  }

  receiveRes(e:user): boolean {
    this.api.edituserDetails(Number(e.id), e).subscribe((res: any) => {
      this.gData.success.status = true;
      this.gData.success.message = res.success;
      this.Data = res.user;
      return true;
    }, (err: { error: { email: (string)[]; }; }) => {
      this.cus_err.msg = err.error.email[0];
      return true;
    });
    return false;
  }

}

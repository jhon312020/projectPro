import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { user, res, err_handle } from 'src/app/model/productinformation';
import { ApiService } from 'src/app/_service/api.service';
import { GlobalService } from 'src/app/_service/global.service';

interface Params { id: string }

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  Data: user | undefined;
  user: user = {
    name: "",
    email: "",
    mobile: "",
    password: '',
    role: 'user',
    status: true
  }
  Initialuser: user= {
    name: "",
    email: "",
    mobile: "",
    password: '',
    role: 'user',
    status: true
  }
  cus_err: err_handle = {
    status: null,
    msg: ""
  };

  constructor(private activeRoute: ActivatedRoute, private router: Router, private api: ApiService, public gData:GlobalService) { }

  ngOnInit(): void {
    this.loadData(this.activeRoute.snapshot.params as Params);
    this.gData.Breadcrumbs.sub_div3.name = "Users";
    this.gData.Breadcrumbs.sub_div3.route = "/admin/userslist";
  }
  async loadData(params: Params) {
    if (params.id) {
      this.Data = await this.api.getuserbyId(Number(params.id)).toPromise();
    } else {
      this.Data = this.Initialuser;
    }
  }
  receiveRes(res:user) {
    if (res.id) {
      this.updateUser(res);
    } else {
      this.createUser(res);
    }
  }
  updateUser(data: user) {
    let id = data.id;
    if (id) {
      this.api.edituserDetails(Number(id), data).subscribe((res: any) => {
        this.gData.success.status = true;
        this.gData.success.message = res.success;
        this.router.navigate(['/admin/userslist']);
        this.Data = res.user;
      }, (err: { error: { email: (string)[]; }; }) => {
        this.cus_err.msg = err.error.email[0];
      });
    }
    
  }
  createUser(data: user) {
    this.api.register(data).subscribe((res: res) => {
      if (res.status) {
        this.gData.success = res;
        this.router.navigate(['/admin/userslist']);
      } else {
        this.cus_err.status = true;
        this.cus_err.msg = res.message;
      }
    });
  }

}

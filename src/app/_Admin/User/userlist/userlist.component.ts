import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { buttonJSON, res } from 'src/app/model/productinformation';
import { ApiService } from 'src/app/_service/api.service';
import { GlobalService } from 'src/app/_service/global.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  button: buttonJSON = {
    Route: "/admin/createuser",
    ButtonName: "Add User"
  }
  header: string[] = [];
  data: any[] = [];
  constructor(private api: ApiService, private router:Router, private gData: GlobalService) { }

  ngOnInit(): void {
    this.header = ["No", "Name", "Email", "Login", "Role"];
    this.loadUserData();
    this.gData.Breadcrumbs.sub_div3.name = "Users";
    this.gData.Breadcrumbs.sub_div3.route = "/admin/userslist";
  }
  async loadUserData() {
    let token = this.gData.getToken();
    let userData = await this.api.getUsers(token).toPromise();
    this.data = userData.map((temp: { id: number; name: string; email: string; login_date: string, role: string; }, index: number) =>{
      return {id: temp.id, dataArray: [index+1, temp.name, temp.email, temp.login_date, temp.role]}
    });
  }
  receiveRes(res: {id:number, action: string}) {
    if(res.action == "edit") {
      this.router.navigate(["/admin/edituser/"+res.id]);
    } else if(res.action == "delete") {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.api.deleteuser(res.id).subscribe((res: res) => {
            if(res.status) {
              Swal.fire(
                'Deleted!',
                'This user has been deleted.',
                'success'
              )
              this.loadUserData();
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: res.message,
              })
            }
          })
          
        }
      })
    }
  }

}

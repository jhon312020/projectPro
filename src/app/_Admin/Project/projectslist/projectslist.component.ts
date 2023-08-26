import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { buttonJSON, ProjectList, res } from 'src/app/model/productinformation';
import { ApiService } from 'src/app/_service/api.service';
import { GlobalService } from 'src/app/_service/global.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-projectslist',
  templateUrl: './projectslist.component.html',
  styleUrls: ['./projectslist.component.css']
})
export class ProjectslistComponent implements OnInit {

  button: buttonJSON = {
    Route: "/admin/createproject",
    ButtonName: "Add Project"
  }
  header: string[] = [];
  data: any[] = [];

  constructor(private api:ApiService, private router: Router, private gData:GlobalService) { }

  ngOnInit(): void {
    this.header = ["#", "Project Name", "Category", "Type", "Status"];
    this.loadData();
    this.gData.Breadcrumbs.sub_div3.name = "Projects";
    this.gData.Breadcrumbs.sub_div3.route = "/admin/projectslist";
  }
  async loadData() {
    let token = this.gData.getToken();
    let proData = await this.api.listProject(token).toPromise();
    this.data = proData.map((temp:any, key:number) => {
      let td1 =  key + 1;
      let td2 = temp.title;
      let td3 = temp.cat_title;
      let td4 = temp.type;
      let td5 = temp.status? "Active": "Inactive";
      let dataArray = [td1, td2, td3, td4, td5];
      return {id: temp.id, dataArray: dataArray};
    });
  }

  receiveRes(e:any) {
    if(e.action == "edit") {
      this.router.navigate(["/admin/editproject/"+e.id]);
    } else if(e.action == "delete") {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this Project!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          let data = {id: e.id, userToken: this.gData.getToken()}
          this.api.deleteProject(data).subscribe((res:res) => {
            if (res.status) {
              Swal.fire(
                'Deleted!',
                'Your Project has been deleted.',
                'success'
              )
              this.loadData();
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: res.message,
              })
            }
          })
          
        }
        //  else if(result.dismiss === Swal.DismissReason.cancel) {
        //   Swal.fire(
        //     "Safe!",
        //     "your Category is safe....",
        //     "info"
        //   )
        // }
      })
    }
  }

  receiveReportRes(e:any) {
    console.log('Receivereportres',e);
  }

}

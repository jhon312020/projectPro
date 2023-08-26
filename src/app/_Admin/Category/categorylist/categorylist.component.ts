import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { buttonJSON, category , res} from 'src/app/model/productinformation';
import { ApiService } from 'src/app/_service/api.service';
import { GlobalService } from 'src/app/_service/global.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-categorylist',
  templateUrl: './categorylist.component.html',
  styleUrls: ['./categorylist.component.css']
})
export class CategorylistComponent implements OnInit {
  constructor(private api: ApiService, private router: Router, private gData: GlobalService) { }
  button: buttonJSON = {
    Route: "/admin/createcategory",
    ButtonName: "Add Category"
  }
  header: string[] = [];
  data: any[] = [];

  ngOnInit(): void {
    this.header = ["S.No.", "Name", "Status"];
    this.loadCategoryData();
    this.gData.Breadcrumbs.sub_div3.name = "Categories";
    this.gData.Breadcrumbs.sub_div3.route = "/admin/categorylist";
  }

  async loadCategoryData() {
    let token = this.gData.getToken();
    let catData = await this.api.listCategory(token).toPromise();
    let count = 1;
    this.data = catData.map((temp:category) => {
      let td1 = count++;
      let td2 = temp.title;
      //let td3 = temp.img+':img';
      let td4 = temp.status? "Active": "Inactive";
      let dataArray = [td1, td2, td4];
      return {id: temp.id, dataArray: dataArray};
    });
  }
  
  receiveRes(res:any) {
    if(res.action == "edit") {
      this.router.navigate(["/admin/editcategory/"+res.id]);
    } else if(res.action == "delete") {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this Category!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          let data = {id: res.id, userToken: this.gData.getToken()}
          this.api.deleteCategory(data).subscribe((res:res) => {
            if (res.status) {
              Swal.fire(
                'Deleted!',
                'Your Category has been deleted.',
                'success'
              )
              this.loadCategoryData();
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
}

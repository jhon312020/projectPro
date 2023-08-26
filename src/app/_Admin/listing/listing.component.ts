import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { buttonJSON, category } from '../../model/productinformation';
import { ApiService } from '../../_service/api.service';
import { GlobalService } from 'src/app/_service/global.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  @Input() type: string = "category";
  @Output() sendRes: EventEmitter<any> = new EventEmitter<any>();

  constructor(private api: ApiService, private router: Router, private gData: GlobalService) { }

  Data:any;
  Header: string[] = [];
  base: string = "/admin/";
  addButton:buttonJSON = {
    Route: "",
    ButtonName: ""
  }
  page:number =1;

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    switch (this.type) {
      case "user":
        this.loadUserButton();
        this.loadUserHeader();
        this.loadUserData();
        break;
      case "category":
        this.loadCategoryButton();
        this.loadCategoryHeader();
        this.loadCategoryData();
        break; 
      default:
        this.loadCategoryButton();
        this.loadCategoryHeader();
        this.loadCategoryData();
        break;
    }
  }

  // Category Loading
  loadCategoryHeader() {
    this.Header = ["No", "Category Name", "Slug", "Status"];
  }
  async loadCategoryData() {
    let token = this.gData.getToken();
    let catData =await this.api.listCategory(token).toPromise();
    this.Data = catData.map((temp:category) => {
      let td1 = temp.id;
      let td2 = temp.title;
      let td3 = temp.slug;
      let td4 = temp.status? "Active": "Inactive";
      let dataArray = [td1, td2, td3, td4];
      return {id: temp.id, dataArray: dataArray};
    });
  }
  loadCategoryButton() {
    this.addButton.ButtonName = "Add Category";
    this.addButton.Route = this.base+"createcategory";
  }

  // User Loading
  loadUserHeader() {
    this.Header = ["No", "Name", "Email", "Role"];
  }
  async loadUserData() {
    let token = this.gData.getToken();
    let userData = await this.api.getUsers(token).toPromise();
    this.Data = userData.map((temp: { id: number; name: string; email: string; role: string; }) =>{
      return {id: temp.id, dataArray: [temp.id, temp.name, temp.email, temp.role]}
    });
  }
  loadUserButton() {
    this.addButton.ButtonName = "Add User";
    this.addButton.Route = this.base+"createUser";
  }

  receiveRes(res:any) {
    if (res.action == "edit") {
      this.router.navigate([this.base+res.action+this.type+"/"+res.id]);
    } else if (res.action == "delete") {
      if(res.action == "delete") {
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
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          } else if(result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
              "Safe!",
              "your file is safe....",
              "info"
            )
          }
        })
      }
    }
  }
}

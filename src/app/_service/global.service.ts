import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { user, file_response, fileValidator, res, category, Project, ProjectList, reports, paginationModel } from '../model/productinformation';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  admin: boolean = false;
  Category: category[] | undefined;
  Projects: ProjectList[] | undefined;
  sub_admin: boolean = false;
  Breadcrumbs = {
    sub_div: "",
    sub_div2: {name: "",route: ""},
    sub_div3: {name: "",route: ""},
  }
  AdminOrUser: string = "";

  constructor(private router: Router) { }
  
  isAuth():boolean {
    let token = localStorage.getItem('token');
    if (token) {
      return true;
    } else {
      return false;
    }
  }

  getAuth() {
    if (this.isAuth()) {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  getToken(): string {
    let token = localStorage.getItem('token');
    if(token) {
      return JSON.parse(token);
    }
    return "";
  }
  getUser(): user {
    let token = localStorage.getItem('token');
    if (token) {
      return JSON.parse(token);
    }
    return {name: "", email: "", mobile: "", password: "", role: ""};
  }

  isAdmin(): boolean {
    if (this.getUser().role == "admin" || this.getUser().role == "staff") {
      return true;
    }
    return false
  }

  getUserinformation(): user {
    let user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    }
    return {name: "", email: "", mobile: "", password: "", role: ""}
  }

  success: res  = {
    status: false,
    message: ""
  }
  failure: res  = {
    status: false,
    message: ""
  }
  reset: res  = {
    status: false,
    message: ""
  }

  report: reports = {
    from_date: "",
    to_date: "",
  }

  pagination: paginationModel = {
    page:  1,
    itemsPerPage: 10,
    totalRecCount:  0
  }

  // file validator
  fileValidator(file:any[], validateType:string, size:number, sizetype: string): fileValidator {
    const result: file_response[] = [];
    const files: any[] = [];
    sizetype = sizetype.toLocaleLowerCase();
    validateType = validateType.toLocaleLowerCase();
    if (sizetype == "kb") {
      size = size * 1024;
    } else if (sizetype == "mb") {
      size = size * (1024*1024);
    } else {
      size = size;
    }
    for (let i = 0; i < file.length; i++) {
      let response: file_response = {
        status: "",
        filename: file[i].name,
        message: ""
      };
      let validate: string | any[] = [];
      if (validateType == "image" || validateType == "img") {
        validate = ["image/jpeg", "image/png", "image/svg+xml", "image/jpg"]
      } else if(validateType == "zip") {
        validate = ["application/zip", "application/x-zip-compressed", "application/x-zip"];
      }
      if (file[i].size <= size) {
        if (validate.includes(file[i].type)) {
          response.status = "success";
          response.message = "file satisfied!";
          files.push(file[i]);
        } else {
          response.status = "err";
          response.message = "This type of file could not accept";
        }
      } else {
        response.status = "err";
        response.message = "This file was too large!";
      }
      result.push(response);
    }
    return {result: result, files: files}

  }

  
  // chage date formate
  changeDateformat(d: string):string {
    let date = new Date(d);
    const monthNames = [
      "January", "February", "March", "April", "May", "June", 
      "July", "August", "September", "October", "November", "December"
    ];
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    const formattedDate = `${day} ${month}, ${year}`;
    // console.log(formattedDate);
    return formattedDate;
  }


  // clear Breadcrumbs 

  clearBreadcrumbs() {
    // console.log("from clear function");
    this.Breadcrumbs.sub_div = "";
    this.Breadcrumbs.sub_div2.name = '';
    this.Breadcrumbs.sub_div2.route = '';
    this.Breadcrumbs.sub_div3.name = '';
    this.Breadcrumbs.sub_div3.route = '';
  }

  showRatingInHtml(userRating:any) {
    let starContent = '';
    for(let rating = 0; rating < 5; rating++ ) {
      if (rating < userRating) {
        starContent += '<span class="fa fa-star checked"></span>';
      } else {
        starContent += '<span class="fa fa-star"></span>';
      }
    }
    return starContent;
  }

}

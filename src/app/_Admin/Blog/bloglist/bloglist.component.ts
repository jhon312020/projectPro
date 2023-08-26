import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { blogs, buttonJSON, res } from 'src/app/model/productinformation';
import { ApiService } from 'src/app/_service/api.service';
import { GlobalService } from 'src/app/_service/global.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bloglist',
  templateUrl: './bloglist.component.html',
  styleUrls: ['./bloglist.component.css']
})
export class BloglistComponent implements OnInit {

  button: buttonJSON = {
    Route: "/admin/createblog",
    ButtonName: "Add Blog"
  }
  header: string[] = [];
  data: any[] = [];
  
  constructor(private api:ApiService, private gData: GlobalService, private router: Router) { }

  ngOnInit(): void {
    this.header = ["No", "Blog Title", "Blog Slug", "Status"];
    this.loadBlogData();
    this.gData.Breadcrumbs.sub_div3.name = "Blogs";
    this.gData.Breadcrumbs.sub_div3.route = "/admin/blogslist";
  }

  async loadBlogData() {
    let token = this.gData.getToken();
    let blogData = await this.api.getBlogs(token).toPromise();
    this.data = blogData.map((temp:blogs, key:number) => {
      let td1 =  key+1;
      let td2 = temp.title;
      let td3 = temp.slug;
      let td4 = temp.status? "Active": "Inactive";
      let dataArray = [td1, td2, td3, td4];
      return {id: temp.id, dataArray: dataArray};
    });
  }
  receiveRes(e:any) {
    if(e.action == "edit") {
      this.router.navigate(["/admin/editblog/"+e.id]);
    } else if(e.action == "delete") {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this Blog!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          let token = this.gData.getToken();
          this.api.deleteBlog(e.id, token).subscribe((res:any) => {
            if (res.status) {
              Swal.fire(
                'Deleted!',
                'Your Blog has been deleted.',
                'success'
              )
              this.loadBlogData();
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

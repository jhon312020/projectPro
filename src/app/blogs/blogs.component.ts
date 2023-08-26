import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { blogs } from '../model/productinformation';
import { ApiService } from '../_service/api.service';
import { GlobalService } from '../_service/global.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {

  Blogs: blogs[] = [];
  base: string = environment.backend;
  page: number = 1;

  constructor(private gData:GlobalService, private api:ApiService) { }

  ngOnInit(): void {
    this.gData.clearBreadcrumbs();
    this.gData.Breadcrumbs.sub_div2.name = "Blogs";
    this.gData.Breadcrumbs.sub_div2.route = "blog";
    this.loadBlogs();
  }

  loadBlogs() {
    this.api.getActiveBlogs().subscribe((res:any) => {
      this.Blogs = res.map((temp: blogs) => {
        temp.created_at = this.gData.changeDateformat(temp.created_at as string);
        return temp;
      });
    })
  }

}

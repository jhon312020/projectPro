import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { blogs } from '../model/productinformation';
import { ApiService } from '../_service/api.service';
import { GlobalService } from '../_service/global.service';

@Component({
  selector: 'app-recent-blogs',
  templateUrl: './recent-blogs.component.html',
  styleUrls: ['./recent-blogs.component.css']
})
export class RecentBlogsComponent implements OnInit {

  Blogs: blogs[] = [];
  base: string = environment.backend;

  constructor(private gData:GlobalService, private api:ApiService) { }

  ngOnInit(): void {
    this.loadRecentBlogs();
  }

  loadRecentBlogs() {
    this.api.getRecentActiveBlogs().subscribe((res:any) => {
      this.Blogs = res.map((temp: blogs) => {
        temp.created_at = this.gData.changeDateformat(temp.created_at as string);
        return temp;
      });
    })
  }

}

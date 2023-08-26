import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { blogs } from '../model/productinformation';
import { ApiService } from '../_service/api.service';
import { GlobalService } from '../_service/global.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {

  Blogs: blogs[] = [];
  base: string = environment.backend;
  BlogDetail: blogs | undefined;

  constructor(private gData:GlobalService, private api:ApiService, private activeRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params => {
      //console.log(params.has('slug')); // true
      let slug = params.get('slug');
      this.loadBlogDetails(slug);
    })
    // let slug = this.activeRoute.snapshot.params['slug'];
    // this.loadBlogDetails(slug);
    this.loadBlogs();
  }

  loadBlogDetails(slug:any) {
    this.api.getBlogBySlug(slug).subscribe((res:any) => {
      // console.log(res.content);
      // res.content = JSON.parse(res.content);
      res.created_at = this.gData.changeDateformat(res.created_at);
      this.BlogDetail = res;
    });
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

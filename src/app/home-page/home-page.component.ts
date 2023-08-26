import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalService } from '../_service/global.service';
import { environment } from 'src/environments/environment';
import { ApiService } from '../_service/api.service';
import { category, Project, ProjectList } from '../model/productinformation';
import { register } from 'swiper/element/bundle';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  contact = {
    address: "",
    email: "",
    mobile_number: "",
    open_hours: "",
  }
  Projects: ProjectList[] | undefined;
  projectType: string = 'project';
  type: string = "/projects/";
  base: string = environment.backend;
  @ViewChild('latest_projects') latestProjectsContainer: any;
  @ViewChild('testimonialSlides') testimonialSlides: any;
  

  constructor(private gData:GlobalService, private api:ApiService) { }

  ngOnInit(): void {
    this.gData.clearBreadcrumbs();
    this.contact.address = environment.address;
    this.contact.email = environment.email;
    this.contact.mobile_number = environment.mobile_number;
    this.contact.open_hours = environment.open_hours;
    this.loadProject();
  }
  ngAfterViewInit() {
    //const swiperEl = this.latestProjectsContainer; //document.querySelector('swiper-container');
    register();
    // swiper parameters
    const swiperProjectParams = {
      slidesPerView: 1,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      pagination: false,
      breakpoints: {
        640: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      },
      on: {
        init() {
          // ...
        },
      },
    };

    // now we need to assign all parameters to Swiper element
    Object.assign(this.latestProjectsContainer.nativeElement, swiperProjectParams);
    this.latestProjectsContainer.nativeElement.initialize();

    // and now initialize it
    
    // setTimeout(() => {
    //     //this.swiperElement.nativeElement.initialize();
    //    this.latestProjectsContainer.nativeElement.initialize();
    // })

   const swiperTestimonialsParams = {
      speed: 600,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      slidesPerView: 'auto',
      pagination: {
        el: '#testimonialPagination',
        type: 'bullets',
        clickable: true
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 40
        },

        1200: {
          slidesPerView: 3,
        }
      }
    };
    Object.assign(this.testimonialSlides.nativeElement, swiperTestimonialsParams);
    setTimeout(() => {
      this.testimonialSlides.nativeElement.initialize();
    });
  }

  async loadProject() {
    this.gData.Projects = await this.api.getLatestProjects(this.projectType).toPromise();
    if (this.gData.Projects?.length) {
      this.Projects = this.gData.Projects;
    }
  }

}

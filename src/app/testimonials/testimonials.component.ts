import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Testimonial } from '../model/productinformation';
import { ApiService } from '../_service/api.service';
import { GlobalService } from '../_service/global.service';
import { register } from 'swiper/element/bundle';


@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent implements OnInit {

  Testimonials: Testimonial[] = [];
  base: string = environment.backend;
  page: number = 1;
  @ViewChild('testimonialSlides') testimonialSlides: any;

  constructor(private gData:GlobalService, private api:ApiService) { }

  ngOnInit(): void {
    this.loadTestimonials();
  }
  ngAfterViewInit() {
    register();

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

  async loadTestimonials() {
    let token = this.gData.getToken();
    this.api.getTestimonials(token).subscribe((res:any) => {
      this.Testimonials = res.map((temp: Testimonial) => {
        temp.created_at = this.gData.changeDateformat(temp.created_at as string);
        return temp;
      });
      console.log(this.Testimonials);
    })
  }

}

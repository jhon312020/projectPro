import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { category, err_handle, review, res } from '../../../model/productinformation';
import { ApiService } from '../../../_service/api.service';
import { GlobalService } from '../../../_service/global.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css']
})
export class ReviewFormComponent implements OnInit {
  err:string | undefined;

  ReviewForm: FormGroup = new FormGroup({});
  review: review = {
    title: '',
    order_id: '',
    rating: '',
    message: '',
    name: '',
  }

  submitted: boolean = false;
  data: string = '';
  project_title: string = '';
  constructor(private fb:FormBuilder, private gData: GlobalService, private api: ApiService, private ActiveRoute: ActivatedRoute, private router: Router) { }

  async ngOnInit() {
    this.loadData(this.ActiveRoute.snapshot.params);
    this.validating();
  }
  
  loadData(params:any) {
    this.api.getOrderDetails(params.order_id).subscribe((res:any) => {
      if(!res.status) {
        this.data = this.review.title = res.response.title;
        this.review.order_id = params.order_id;
        this.validating();
      } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: res.message,
          }).then((result) => {
            this.router.navigate(['/dashboard']);
          })
        }
    })
  }

  validating() {
    this.ReviewForm = new FormGroup({
      title: new FormControl(this.review.title, Validators.required),
      rating: new FormControl(this.review.rating, Validators.required),
      message: new FormControl(this.review.message, Validators.required),
    });
  }
  get formData(){
    return this.ReviewForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    let token = this.gData.getToken();
    console.log(this.formData);
    if (this.ReviewForm.valid) {
      this.review.message = this.formData['message'].value;
      this.review.rating = this.formData['rating'].value;
      let token = this.gData.getToken();
      this.api.postProjectReview(this.review, token).subscribe((res:res) => {  
        if (res.status) {
          this.gData.success = res;
          this.router.navigate(["/dashboard/orders/"]);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: res.message,
          })
        }
      })
    }
  }
}


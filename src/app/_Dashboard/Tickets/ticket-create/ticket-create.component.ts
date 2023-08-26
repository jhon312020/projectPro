import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { category, err_handle, ticket, res } from '../../../model/productinformation';
import { ApiService } from '../../../_service/api.service';
import { GlobalService } from '../../../_service/global.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-ticket-create',
  templateUrl: './ticket-create.component.html',
  styleUrls: ['./ticket-create.component.css']
})
export class TicketCreateComponent implements OnInit {
  err:string | undefined;

  TicketForm: FormGroup = new FormGroup({});
  ticket: ticket = {
    title: '',
    order_id: '',
    subject: '',
    message: '',
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
        this.data = this.ticket.title = res.response.title;
        this.ticket.order_id = params.order_id;
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
    this.TicketForm = new FormGroup({
      title: new FormControl(this.ticket.title, Validators.required),
      subject: new FormControl(this.ticket.subject, Validators.required),
      message: new FormControl(this.ticket.message, Validators.required),
    });
  }
  get formData(){
    return this.TicketForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    let token = this.gData.getToken();
    console.log(this.formData);
    if (this.TicketForm.valid) {
      this.ticket.message = this.formData['message'].value;
      this.ticket.subject = this.formData['subject'].value;
      let token = this.gData.getToken();
      this.api.createProjectTicket(this.ticket, token).subscribe((res:res) => {  
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



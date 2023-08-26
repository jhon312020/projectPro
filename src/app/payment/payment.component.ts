import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProjectList, res } from '../model/productinformation';
import { ApiService } from '../_service/api.service';
import { GlobalService } from '../_service/global.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  @ViewChild('paymentElement') 
  paymentElement!: ElementRef;
  upi = {
    pa: environment.payee_VPA,
    pn: environment.business_name,
    tn: "Project",
    am: "0.00",
    cu: environment.currency
  }  
  upiLink = "";

  constructor(private Arouter:ActivatedRoute,private router:Router, private api:ApiService, public gData:GlobalService, private renderer: Renderer2) { }

  projectInformation: ProjectList | undefined;

  salePrice: number = 0;

  ngOnInit(): void {
    let projectId = this.Arouter.snapshot.params['projectname'];
    let id = this.Arouter.snapshot.params['id'];
    this.loadPaymentData(projectId, id);
  }
  loadPaymentData(projectname: string, id: number) {
    this.api.getOrderDetails(id).subscribe((res:any) => {
      if (res.status) {
        this.salePrice = res.response.project_price - (res.response.discount/100 * res.response.project_price);
        this.projectInformation = res.response;
        this.upi.am = this.salePrice.toString();
        this.upi.tn = res.response.type;
        this.upiLink = new URLSearchParams(this.upi).toString();
        this.upiLink = "upi://pay?"+this.upiLink;
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: res.message,
        }).then((result) => {
          this.router.navigate(['']);
        })
      }
    })
  }

  payment() {
    this.renderer.setAttribute(this.paymentElement.nativeElement, "disabled", "disabled");
    let id = this.Arouter.snapshot.params['id'];
    const childElements = this.paymentElement.nativeElement.children;
    for (let child of childElements) {
      this.renderer.removeChild(this.paymentElement.nativeElement, child);
    }
    let i = this.renderer.createElement("i");
    const text = this.renderer.createText(' Please wait!');
    this.renderer.setAttribute(i, "class", "fas fa-circle-notch fa-spin");
    this.renderer.appendChild(this.paymentElement.nativeElement, i);
    this.renderer.appendChild(this.paymentElement.nativeElement, text);
    this.api.updateOrder({id: id}).subscribe((res:res) => {
      if (res.status) {
        this.gData.success = res;
        this.router.navigate(['/dashboard/orders']);
        // this.router.navigate(['/']);
      } else {
        this.gData.failure.status = true;
        this.gData.failure.message = res.message;
        this.router.navigate(["/"]);
      }
    })
  }

}

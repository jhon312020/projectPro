import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  contactAdmin = {
    address: "",
    email: "",
    mobile_number: "",
    open_hours: "",
  }
  constructor() { }

  ngOnInit(): void {
    this.contactAdmin.address = environment.address;
    this.contactAdmin.email = environment.email;
    this.contactAdmin.mobile_number = environment.mobile_number;
    this.contactAdmin.open_hours = environment.open_hours;
  }

  scrollUp() {
    window.scroll(0, 0);
  }

}

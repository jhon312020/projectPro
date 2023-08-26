import { Component, Input, OnInit } from '@angular/core';
import { res } from 'src/app/model/productinformation';
import { GlobalService } from 'src/app/_service/global.service';

@Component({
  selector: 'app-alert-msg',
  templateUrl: './alert-msg.component.html',
  styleUrls: ['./alert-msg.component.css']
})
export class AlertMsgComponent implements OnInit {
  // @Input() alertType

  constructor(public global: GlobalService) { }
  
  ngOnInit(): void {
  }

  resetSuccess() {
    this.global.success = this.global.reset;
  }
  resetFailure() {
    this.global.failure = this.global.reset;
  }
}

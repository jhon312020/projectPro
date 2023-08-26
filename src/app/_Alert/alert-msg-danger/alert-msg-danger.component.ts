import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/_service/global.service';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-alert-msg-danger',
  templateUrl: './alert-msg-danger.component.html',
  styleUrls: ['./alert-msg-danger.component.css']
})
export class AlertMsgDangerComponent implements OnInit {

  constructor(public global: GlobalService, private router: Router) { 
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.global.failure.status = false; 
        this.global.failure.message = '';
      }
    });
  }

  ngOnInit(): void {
    this.resetFailure();
  }
  public resetFailure():void {
    // setTimeout(() => { /*console.log(this.global.success);*/ this.global.failure.status = false; this.global.failure.message = '';  }, 3000);
  }

}

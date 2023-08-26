import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/_service/global.service';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-alert-msg-success',
  templateUrl: './alert-msg-success.component.html',
  styleUrls: ['./alert-msg-success.component.css']
})
export class AlertMsgSuccessComponent implements OnInit {

 constructor(public global: GlobalService, private router: Router) { 
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.global.success.status = false; 
        this.global.success.message = '';
      }
    });
  }

  ngOnInit(): void {
    this.resetSuccess()
  }
  public resetSuccess():void {
    // setTimeout(() => { /*console.log(this.global.success);*/ this.global.success.status = false; this.global.success.message = '';  }, 3000);
  }
}


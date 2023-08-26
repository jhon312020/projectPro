import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../_service/global.service';

@Component({
  selector: 'app-access-denied',
  templateUrl: './access-denied.component.html',
  styleUrls: ['./access-denied.component.css']
})
export class AccessDeniedComponent implements OnInit {
  constructor(public gData: GlobalService) { }
  
  ngOnInit():void {
    this.gData.clearBreadcrumbs();
  }
}

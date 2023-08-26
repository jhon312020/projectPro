import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-list-table',
  templateUrl: './list-table.component.html',
  styleUrls: ['./list-table.component.css']
})
export class ListTableComponent implements OnInit {

  @Input() header: any;
  @Input() body: any;
  @Output() sendRes: EventEmitter<any> = new EventEmitter<any>();
  page: number = 1;

  constructor() { }

  ngOnInit(): void {
    // console.log(this.body);
  }

  getResponse(action: string, id: number) {
    if (action == "edit") {
      this.sendRes.emit({id: id, action : "edit"}) ;
    } else {
      this.sendRes.emit({id: id, action: action});
    }
  }

}

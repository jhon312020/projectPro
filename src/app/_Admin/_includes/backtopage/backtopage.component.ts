import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { backPage } from 'src/app/model/productinformation';

@Component({
  selector: 'app-backtopage',
  templateUrl: './backtopage.component.html',
  styleUrls: ['./backtopage.component.css']
})
export class BacktopageComponent implements OnInit {

  @Input() backToPage : backPage = {
    label: "",
    route: "",
  };
  constructor() { }

  ngOnInit(): void {
  }

}

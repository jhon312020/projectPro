import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_service/api.service';
import { GlobalService } from 'src/app/_service/global.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  Data: any[] = [];

  constructor(private api:ApiService, private gData: GlobalService) { }

  ngOnInit(): void {
    this.transactions();
    this.gData.Breadcrumbs.sub_div3.name = "Transactions";
    this.gData.Breadcrumbs.sub_div3.route = "/dashboard/transactions";
  }

  transactions() {
    let token = this.gData.getToken();
    this.api.getTransactions(token).subscribe((res:any) => {
      if(res.status) {
        this.Data = res.success;
      }
    })
  }

}

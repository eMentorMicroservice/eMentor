import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-account-balance',
  templateUrl: './account-balance.component.html',
  styleUrls: ['./account-balance.component.css']
})
export class AccountBalanceComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      $('#datatable').dataTable();
    });
  }

}

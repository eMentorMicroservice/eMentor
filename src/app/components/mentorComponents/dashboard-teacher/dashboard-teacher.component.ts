import { Component, OnInit } from '@angular/core';
import { LocalService } from 'src/app/services/common/local.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dashboard-teacher',
  templateUrl: './dashboard-teacher.component.html',
  styleUrls: ['./dashboard-teacher.component.css']
})
export class DashboardTeacherComponent implements OnInit {
  userName: any;

  constructor(private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.userName = LocalService.getUserName();
    this.spinner.hide();
  }

}

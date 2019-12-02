import { Component, OnInit } from '@angular/core';
import { LocalService } from 'src/app/services/common/local.service';

@Component({
  selector: 'app-dashboard-teacher',
  templateUrl: './dashboard-teacher.component.html',
  styleUrls: ['./dashboard-teacher.component.css']
})
export class DashboardTeacherComponent implements OnInit {
  userName: any;

  constructor() { }

  ngOnInit() {
    this.userName = LocalService.getUserName();
  }

}

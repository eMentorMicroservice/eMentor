import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UserModel } from 'src/app/models/user.model';
import { LocalService } from 'src/app/services/common/local.service';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  users: UserModel[] = [];
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getAllUsers()
      .subscribe(apiUsers => {
        if (apiUsers) {
          this.users = apiUsers;
          setTimeout(() => {
            $('#datatable').dataTable();
          });
        }
      });
  }
  upgrade(id: number) {
    this.userService.upGradeUser(id).subscribe(() => {
      this.getUsers();
    });
  }
  remove(id: number) {
    this.userService.deleteUser(id).subscribe(() => {
      this.getUsers();
    });
  }
}

export const jsDatatableFile = [
  {
    name: 'dataTables',
    src: 'src/plugins/datatables/jquery.dataTables.min.js'
  },
  {
    name: 'bootstrap4',
    src: 'src/plugins/datatables/dataTables.bootstrap4.min.js'
  },
  {
    name: 'responsive',
    src: 'src/plugins/datatables/dataTables.responsive.min.js'
  }
];

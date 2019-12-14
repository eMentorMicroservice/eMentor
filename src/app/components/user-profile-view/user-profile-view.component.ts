import { Component, OnInit } from '@angular/core';
import { LocalService } from 'src/app/services/common/local.service';
import { LOCAL_STORAGE_VARIABLE } from 'src/app/app.constants';
import { UserRole } from 'src/app/models/enums';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/app/services/user.service';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-profile-view',
  templateUrl: './user-profile-view.component.html',
  styleUrls: ['./user-profile-view.component.css']
})
export class UserProfileViewComponent implements OnInit {
  isTeacher = false;
  userName: any;
  user: UserModel;
  constructor(private spinner: NgxSpinnerService,
    private userService: UserService) { }

  ngOnInit() {
    this.spinner.show();
    this.user = new UserModel();
    this.isTeacher = LocalService.getItem(LOCAL_STORAGE_VARIABLE.user_role) === UserRole.Teacher.toString() ? true : false;
    this.userName = LocalService.getUserName();
    this.getUserProfile();
    this.spinner.hide();
  }
  getUserProfile() {
    this.userService.getUserProfile().subscribe(data => {
        this.user = data;
        console.log(this.user);
      });
  }
}

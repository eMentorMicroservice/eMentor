import { Component, OnInit } from '@angular/core';
import { ChangePasscode } from 'src/app/models/changepasscode.model';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notify.service';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { LocalService } from 'src/app/services/common/local.service';
import { LOCAL_STORAGE_VARIABLE } from 'src/app/app.constants';
import { UserRole } from 'src/app/models/enums';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  model = new ChangePasscode();
  backgroundImage = 'assets/images/coach-menntor.jpg';
  constructor(
    private userService: UserService,
    private router: Router,
    private notifyService: NotificationService) { }
  ngOnInit() {
  }

  changePassword(myForm: NgForm) {
    if (myForm.invalid) {
      return;
    }
    this.userService.changePasscode(this.model)
      .subscribe(data => {
        this.notifyService.success('Your password has been changed successfully !!!');
        setTimeout(() => {
          const userRole = LocalService.getItem(LOCAL_STORAGE_VARIABLE.user_role);
          if (userRole === UserRole.Student.toString()) {
          this.router.navigate(['/home-student']);
          } else {
            this.router.navigate(['/home-teacher']);
          }
        }, 1500);
      },
        error => {
          this.model = new ChangePasscode();
        });
  }
}

import { Component, OnInit, Injectable } from '@angular/core';
import { LoginModel } from 'src/app/models/login.model';
import { NgForm } from '@angular/forms';
import { LocalService } from 'src/app/services/common/local.service';
import { LOCAL_STORAGE_VARIABLE } from 'src/app/app.constants';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  model = new LoginModel();
  backgroundImage = 'assets/images/coach-menntor.jpg';
  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {

  }
  login(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService.login(this.model)
      .subscribe(data => {
        if (data && data.token) {
          LocalService.setAccessToken(data.token);
          LocalService.setLogStatus(true);
          LocalService.setItem(LOCAL_STORAGE_VARIABLE.is_admin, data.role);
          LocalService.setItem(LOCAL_STORAGE_VARIABLE.user_role, data.role);
          LocalService.setUserAvt(data.avatar);
          LocalService.setUserName(data.fullName);
          LocalService.setUserId(data.userId);
          this.router.navigate(['/home']);
        }
      },
        error => {
          this.model = new LoginModel();
        });
  }
}

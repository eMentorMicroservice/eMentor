
import { Injectable } from '@angular/core';
import { LocalService } from './common/local.service';
import { BaseService } from './common/base.service';
import { HttpClient } from '@angular/common/http';
import { ErrorService } from './common/error.service';
import { GlobalService } from './global.service';
import { LOGIN_STATUS, LOCAL_STORAGE_VARIABLE, ADMIN_CONST } from '../app.constants';
import { LoginModel } from '../models/login.model';
import { UserRole } from '../models/enums';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  constructor(protected http: HttpClient,
    protected errorHandler: ErrorService,
    protected globalService: GlobalService) {
    super(http, errorHandler, globalService);

  }

  static isLoggedIn() {
    return LocalService.getLogStatus() === LOGIN_STATUS.logged_in && LocalService.getAccessToken();
  }

  static isAdmin(): boolean {
    const isAdmin = LocalService.getItem(LOCAL_STORAGE_VARIABLE.is_admin);
    return isAdmin && isAdmin.toString() === ADMIN_CONST;
  }

  static isTeacher(): boolean {
    const isTeacher = LocalService.getItem(LOCAL_STORAGE_VARIABLE.user_role);
    return isTeacher && isTeacher.toString() === UserRole.Teacher.toString();
  }

  login(data: LoginModel) {
    return this.post('/Home/Login', data, false);
  }

  logOut() {
    return this.get('/Home/Logout', null, true);
  }


}

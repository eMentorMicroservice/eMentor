
import { Injectable } from '@angular/core';
import { LocalService } from './common/local.service';
import { BaseService } from './common/base.service';
import { HttpClient } from '@angular/common/http';
import { ErrorService } from './common/error.service';
import { GlobalService } from './global.service';
import { Login } from '../models/login.model';
import { LOGIN_STATUS, LOCAL_STORAGE_VARIABLE, ADMIN_CONST } from '../appComponent/app.constants';

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
    const isAdmin = LocalService.getItem(LOCAL_STORAGE_VARIABLE.is_admin)
    return isAdmin && isAdmin.toString() === ADMIN_CONST;
  }

  login(data: Login) {
    return this.post('/Home/Login', data, false);
  }

  logOut() {
    return this.get('/Home/Logout', null, true);
  }


}

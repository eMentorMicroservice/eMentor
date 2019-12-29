import { Injectable } from '@angular/core';
import { BaseService } from './common/base.service';
import { ErrorService } from './common/error.service';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';
import { RegisterModel } from '../models/register.model';
import { API_ENDPOINT } from '../app.constants';
import { ChangePasscode } from '../models/changepasscode.model';
import { UserModel, UserExperienceModels } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService extends BaseService {
  getAllUsers(): Observable<any> {
    return this.get(API_ENDPOINT.getAllUsers, null, false);
  }

  editProfile(data: UserModel) {
    return this.postFormData(API_ENDPOINT.editProfile, data, true);
  }

  editExperiment(model: UserExperienceModels)
  {
    return this.post(API_ENDPOINT.addOrUpdateUserExp, model, true);
  }

  getUserProfile() {
    return this.get(API_ENDPOINT.getUserProfile, null, false);
  }
    constructor(protected http: HttpClient,
        protected errorHandler: ErrorService,
        protected globalService: GlobalService) {
        super(http, errorHandler, globalService);
    }
    registerAccount(model: RegisterModel): Observable<any> {
        return this.post(API_ENDPOINT.registerAccount, model, false);
    }
    changePasscode(data: ChangePasscode) {
        return this.post(API_ENDPOINT.changePassword, data);
    }
    deleteUser(id: number) {
      return this.post(`${API_ENDPOINT.deleteUser}?userId=${id}`);
    }
    upGradeUser(id: number) {
      return this.post(`${API_ENDPOINT.upgradeUser}?userId=${id}`);
    }
    getUserById(id: number) {
      return this.get(API_ENDPOINT.getUserProfileById, {id: id}, false, false, false);
    }
}

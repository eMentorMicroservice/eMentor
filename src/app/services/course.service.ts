import { Injectable } from '@angular/core';
import { BaseService } from './common/base.service';
import { ErrorService } from './common/error.service';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';
import { RegisterModel } from '../models/register.model';
import { API_ENDPOINT } from '../app.constants';

@Injectable({
    providedIn: 'root'
})
export class CourseService extends BaseService {
    constructor(protected http: HttpClient,
        protected errorHandler: ErrorService,
        protected globalService: GlobalService) {
        super(http, errorHandler, globalService);
    }
    registerAccount(model: RegisterModel) {
        return this.post(API_ENDPOINT.registerAccount, model, false);
    }
    getAllCourses() {
        return this.get(API_ENDPOINT.getAllCourses, null, false);
    }
}

import { Injectable } from '@angular/core';
import { BaseService } from './common/base.service';
import { ErrorService } from './common/error.service';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';
import { RegisterModel } from '../models/register.model';
import { API_ENDPOINT } from '../app.constants';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
    providedIn: 'root'
})
export class HardcodeService extends BaseService {
    constructor(protected http: HttpClient,
        protected errorHandler: ErrorService,
        protected globalService: GlobalService) {
        super(http, errorHandler, globalService);

    }

 getHardcode(hardCodeParent: string): Observable<any> {
    return this.get(`${API_ENDPOINT.getHardCode}?hardCodeParent=${hardCodeParent}`, null, true);
    }
}

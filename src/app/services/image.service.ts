import { Injectable } from '@angular/core';
import { BaseService } from './common/base.service';
import { ErrorService } from './common/error.service';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class ImageService extends BaseService {
    constructor(protected http: HttpClient,
        protected errorHandler: ErrorService,
        protected globalService: GlobalService) {
        super(http, errorHandler, globalService);

    }
    getImage(imageUrl: string): Observable<Blob> {
        return this.getBlob(imageUrl, null, false);
      }
}
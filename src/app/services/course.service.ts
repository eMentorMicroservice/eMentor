import { Injectable } from '@angular/core';
import { BaseService } from './common/base.service';
import { ErrorService } from './common/error.service';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';
import { RegisterModel } from '../models/register.model';
import { API_ENDPOINT } from '../app.constants';
import { UploadCourseModel } from '../models/course.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CourseService extends BaseService {
  editCourse(model: UploadCourseModel) {
    return this.postFormData(API_ENDPOINT.editCourse, model, null, false);
  }
  uploadCourse(model: UploadCourseModel) {
    return this.postFormData(API_ENDPOINT.uploadCourse, model, null, false);
  }
    constructor(protected http: HttpClient,
        protected errorHandler: ErrorService,
        protected globalService: GlobalService) {
        super(http, errorHandler, globalService);
    }
    getAllCourses() {
        return this.get(API_ENDPOINT.getAllCourses, null, false);
    }
    getCurrentMentorCourses() {
      return this.get(API_ENDPOINT.getCoursesByMentorId, null, false);
    }

    getCourseById(id: number): Observable<any> {
        return this.get(`${API_ENDPOINT.getAllCourses}?id=${id}`);
    }
    deleteCourse(id: number) {
      return this.post(`${API_ENDPOINT.deleteCourse}?courseId=${id}`);
    }
}

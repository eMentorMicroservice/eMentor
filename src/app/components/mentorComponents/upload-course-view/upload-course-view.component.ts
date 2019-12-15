import { Component, OnInit } from '@angular/core';
import { CourseModel } from 'src/app/models/course.model';

@Component({
  selector: 'app-upload-course-view',
  templateUrl: './upload-course-view.component.html',
  styleUrls: ['./upload-course-view.component.css']
})
export class UploadCourseViewComponent implements OnInit {
  courses: CourseModel[];
  constructor() { }

  ngOnInit() {
    this.courses = [];
  }

  getCourseByCourseCategory(category: string) {

  }

  sortListCourses(sortMethod: string) {

  }

}

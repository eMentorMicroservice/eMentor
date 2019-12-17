import { Component, OnInit } from '@angular/core';
import { CourseModel } from 'src/app/models/course.model';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-upload-course-view',
  templateUrl: './upload-course-view.component.html',
  styleUrls: ['./upload-course-view.component.css']
})
export class UploadCourseViewComponent implements OnInit {
  courses: CourseModel[];
  constructor(private courseService: CourseService) { }

  ngOnInit() {
    this.courses = [];
    this.getAllCourses();
  }

  getCourseByCourseCategory(category: string) {

  }

  sortListCourses(sortMethod: string) {

  }

  getAllCourses() {
    this.courseService.getAllCourses().subscribe(data => {
      this.courses = data;
    });
  }

}

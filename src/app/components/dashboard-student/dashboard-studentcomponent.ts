import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { CourseModel } from 'src/app/models/course.model';

@Component({
  selector: 'app-dashboard-student',
  templateUrl: './dashboard-student.component.html',
})
export class DashboardStudentComponent implements  OnInit {
  courses: CourseModel[] = [];
  constructor(
    private courseService: CourseService
  ) { }
  ngOnInit() {
    this.getAllCourses();
  }
  getAllCourses() {
    this.courseService.getAllCourses().subscribe(data => {
      this.courses = data;
    });
  }
}

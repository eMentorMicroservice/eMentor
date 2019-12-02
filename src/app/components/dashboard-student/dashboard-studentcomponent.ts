import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { CourseModel } from 'src/app/models/course.model';
import { LocalService } from 'src/app/services/common/local.service';

@Component({
  selector: 'app-dashboard-student',
  templateUrl: './dashboard-student.component.html',
})
export class DashboardStudentComponent implements  OnInit {
  courses: CourseModel[] = [];
  userName: string;
  constructor(
    private courseService: CourseService
  ) { }
  ngOnInit() {
    this.getAllCourses();
    this.userName = LocalService.getUserName();
  }
  getAllCourses() {
    this.courseService.getAllCourses().subscribe(data => {
      this.courses = data;
    });
  }
}

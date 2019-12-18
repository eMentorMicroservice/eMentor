import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocalService } from 'src/app/services/common/local.service';
import { CourseModel } from 'src/app/models/course.model';
import { CourseService } from 'src/app/services/course.service';
import { AuthService } from 'src/app/services/auth.service';
import { stringify } from 'querystring';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userName: any;
  courses: CourseModel[] = [];
  originCoursesList: any;
  isTeacher: boolean;
  constructor(private courseService: CourseService,
     private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.isTeacher = AuthService.isTeacher();
    this.userName = LocalService.getUserName();
    this.getAllCourses();
    this.spinner.hide();
  }
  getAllCourses() {
    this.courseService.getAllCourses().subscribe(data => {
      this.courses = data;
      this.originCoursesList = this.courses;
    });
  }

  searchCourse(term: string) {
    if (!term) {
      this.courses = this.originCoursesList;
    }
    // tslint:disable-next-line: no-trailing-whitespace
    this.courses = this.originCoursesList.filter(course => 
                course.name.toLowerCase().indexOf(term.toLowerCase()) !== -1
             || course.owner.fullName.toLowerCase().indexOf(term.toLowerCase()) !== -1);
  }
}

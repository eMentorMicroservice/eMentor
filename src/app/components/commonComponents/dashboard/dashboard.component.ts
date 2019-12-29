import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocalService } from 'src/app/services/common/local.service';
import { CourseModel } from 'src/app/models/course.model';
import { CourseService } from 'src/app/services/course.service';
import { AuthService } from 'src/app/services/auth.service';
import { stringify } from 'querystring';
import { DialogService } from 'src/app/services/dialog.service';
import { Router } from '@angular/router';

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
     private spinner: NgxSpinnerService,
     private dialog: DialogService,
     private router: Router) { }

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
      console.log(data);
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

  getCourseByCourseCategory(category: string) {
    if (!this.originCoursesList) { return; }
    switch (category.toString()) {
      case '0':
          this.courses = this.originCoursesList;
        break;
      default:
          this.courses = this.originCoursesList.filter(p => p.courseCategory.toString() === category);
        break;
    }
  }

  sortListCourses(sortMethod: string) {
    switch (sortMethod) {
      case 'CourseCategory':
        this.courses = this.courses.sort((a, b) => {
          if (a.categoryModel.Name.toLowerCase() > b.categoryModel.Name.toLowerCase()) { return 1; }
          if (a.categoryModel.Name.toLowerCase() < b.categoryModel.Name.toLowerCase()) { return -1; }
          return 0;
        });
        break;
      case 'Price':
        this.courses = this.courses.sort((a, b) => {
          if (a.courseFee > b.courseFee) { return 1; }
          if (a.courseFee < b.courseFee) { return -1; }
          return 0;
        });
        break;
      default:
        this.courses = this.courses.sort((a, b) => {
          if (a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
          if (a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
          return 0;
        });
        break;

    }
  }

  regisCourse(courseId: number, courseFee: number) {
    this.dialog.confirm('Confirm', 'You must pay atleast ' + courseId + '$ to attend this course', () => {
      this.router.navigate(['/checkout'], {queryParams: {course: courseId}});
    });
  }
}


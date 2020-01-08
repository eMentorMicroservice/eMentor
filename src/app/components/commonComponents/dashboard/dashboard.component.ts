import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocalService } from 'src/app/services/common/local.service';
import { CourseModel } from 'src/app/models/course.model';
import { CourseService } from 'src/app/services/course.service';
import { AuthService } from 'src/app/services/auth.service';
import { stringify } from 'querystring';
import { DialogService } from 'src/app/services/dialog.service';
import { Router } from '@angular/router';
import { ActionCableService, Channel } from 'angular2-actioncable';
import { UserService } from 'src/app/services/user.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userName: any;
  userId: any;
  courses: CourseModel[] = [];
  originCoursesList: any;
  isTeacher: boolean;
  channel: Channel;
  constructor(private courseService: CourseService,
     private spinner: NgxSpinnerService,
     private dialog: DialogService,
     private router: Router,
     private cableService: ActionCableService,
     private userService: UserService,
     private http: HttpClient) { }

  ngOnInit() {
    this.spinner.show();
    this.isTeacher = AuthService.isTeacher();
    
    this.userName = LocalService.getUserName();
    this.userId = LocalService.getUserId();
    if (this.isTeacher) {
      this.connectNotify();
    } 
    this.spinner.hide();
  }

  connectNotify() {
    this.channel = this.cableService.cable('ws://localhost:3000/cable').channel('NotifyChannel', {user_id: this.userId});
    this.channel.connected().subscribe(() => {
      
    })
    this.channel.received().subscribe(data => {
      console.log('data', data)
      if (data.type == "OFFER") {
        this.userService.getUserById(data.from).subscribe(user => {
          this.dialog.confirm('You receive new offer!', user.fullName + ' want to attend your class!', () => {
            let send_data = {from: this.userId, to: data.from};
            this.http.post<any>('http://localhost:3000/notify/accept_offer', JSON.stringify(send_data), {
              headers: new HttpHeaders({
                'Content-Type': 'application/json'
              })
            }).subscribe(resp => {
              if (resp.status == 200) {
                this.router.navigate(['/classroom'])
              }
            });
          })
        })
      }
    })
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

  regisCourse(teacher_id: number,  courseFee: number) {
    this.dialog.confirm('Confirm', 'You must pay atleast ' + courseFee + '$ to attend this course', () => {
      this.router.navigate(['/checkout'], {queryParams: {teacher_id: teacher_id, course_fee: courseFee}});
    });
  }
}


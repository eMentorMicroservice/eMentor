import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseModel } from 'src/app/models/course.model';
import { CourseService } from 'src/app/services/course.service';
import { switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  course: CourseModel;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
  ) { }

  ngOnInit() {
    let course_id= this.route.snapshot.queryParamMap.get('course');
    this.courseService.getCourseById(Number(course_id)).subscribe(data => {
      this.course = data;
      console.log(this.course);
    })
  }

  ngOnDestroy() {

  }

}

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CourseModel } from 'src/app/models/course.model';
import { CourseService } from 'src/app/services/course.service';
import { ImageService } from 'src/app/services/image.service';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-upload-course-view',
  templateUrl: './upload-course-view.component.html',
  styleUrls: ['./upload-course-view.component.css']
})
export class UploadCourseViewComponent implements OnInit {
  courses: CourseModel[];
  constructor(private courseService: CourseService,
              private imgService: ImageService,
              private cd: ChangeDetectorRef, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.courses = [];
    this.getAllCourses();
  }

  getCourseByCourseCategory(category: string) {

  }

  sortListCourses(sortMethod: string) {

  }

  getAllCourses() {
    this.cd.detectChanges();
    this.courseService.getAllCourses().subscribe(data => {
      this.courses = data;
      this.courses.forEach(course => {
        this.getPictureUrl(course.courseImage);
      });
    });
  }
  getPictureUrl(url: string): SafeStyle {
    const style = `url('${url}')`;
    return this.sanitizer.bypassSecurityTrustStyle(style);
  }
}

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
  courses: CourseModel[] = [];
  originList: CourseModel[] = [];
  constructor(private courseService: CourseService,
              private imgService: ImageService,
              private cd: ChangeDetectorRef,
              private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.cd.detectChanges();
    setTimeout(() => {
      this.getCourses();
    });
  }

  getCourseByCourseCategory(category: string) {
    if (!this.originList) { return; }
    switch (category.toString()) {
      case '0':
          this.courses = this.originList;
        break;
      default:
          this.courses = this.originList.filter(p => p.courseCategory.toString() === category);
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

  getCourses() {
    this.cd.detectChanges();
    this.courseService.getCurrentMentorCourses().subscribe(data => {
      this.courses = data;
      this.originList = this.courses;
      this.courses.forEach(course => {
        this.getPictureUrl(course.courseImage);
      });
    });
  }

  getPictureUrl(url: string): SafeStyle {
    const style = `url('${url}')`;
    return this.sanitizer.bypassSecurityTrustStyle(style);
  }

  deleteCourse(id: number){
    this.courseService.deleteCourse(id).subscribe( () => {
      this.getCourses();
    });
  }
}

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DropdownModel } from 'src/app/models/dropdown.model';
import { HardcodeService } from 'src/app/services/hardcode.service';
import { HardCodeConst } from 'src/app/app.constants';
import { UploadCourseModel } from 'src/app/models/course.model';
import { NgForm } from '@angular/forms';
import { CourseService } from 'src/app/services/course.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
import { DatetimeUtils } from 'src/app/utils/dateutil';
import { BaseService } from 'src/app/services/common/base.service';

@Component({
  selector: 'app-upload-course',
  templateUrl: './upload-course.component.html',
  styleUrls: ['./upload-course.component.css']
})
export class UploadCourseComponent implements OnInit {
  title = '';
  courseImage: any;
  logoImageName = '';
  categories: DropdownModel[];
  model: UploadCourseModel;
  courseId = 0;
  constructor(
    private hardcodeService: HardcodeService,
    private courseService: CourseService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.model = new UploadCourseModel();
    this.hardcodeService.getHardcode(HardCodeConst.courseCategories)
      .subscribe(data => {
        this.categories = data;
      });
    this.route.params.subscribe(params => {
      if (!params['id']) {
        this.model.id = 0;
        this.title = 'Upload Course';
      } else {
        this.title = 'Edit Course';
        this.courseId = +params['id'];
        this.courseService.getCourseById(this.courseId).subscribe(data => {
          this.model = data;
        });
      }
    });
    this.spinner.hide();
  }

  onChangeLogo(event) {
    const filesUpload: File = event.target.files[0];
    const reader = new FileReader();
    reader.onload = e => this.courseImage = reader.result;
    reader.readAsDataURL(filesUpload);
    this.model.uploadedImage = filesUpload;
    this.logoImageName = filesUpload.name.toString();
  }

  uploadCourse(form: NgForm) {
    if (form.invalid) { return; }
    this.spinner.show();
    this.model.availableFrom = DatetimeUtils.toShortDateTimeFormat(this.model.availableFrom);
    this.model.availableTo = DatetimeUtils.toShortDateTimeFormat(this.model.availableTo);
    if (this.courseId === 0) {
      this.courseService.uploadCourse(this.model).subscribe(data => {
        if (!data) { return; }
      });
    } else {
      this.courseService.editCourse(this.model).subscribe(data => {
        if (!data) { return; }
      });
    }
    setTimeout(() => {
      this.cd.detectChanges();
      this.router.navigate(['/view-course']);
      });
    this.spinner.hide();
  }
}

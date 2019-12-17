import { Component, OnInit } from '@angular/core';
import { DropdownModel } from 'src/app/models/dropdown.model';
import { HardcodeService } from 'src/app/services/hardcode.service';
import { HardCodeConst } from 'src/app/app.constants';
import { UploadCourseModel } from 'src/app/models/course.model';
import { NgForm } from '@angular/forms';
import { CourseService } from 'src/app/services/course.service';
import { NgxSpinnerService } from 'ngx-spinner';

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
  constructor(
    private hardcodeService: HardcodeService,
    private courseService: CourseService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.model = new UploadCourseModel();

    this.hardcodeService.getHardcode(HardCodeConst.courseCategories)
      .subscribe(data => {
        this.categories = data;
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
    this.courseService.uploadCourse(this.model).subscribe(data =>
      {
        if (!data) { return; }
      });
      this.spinner.hide();
  }

}

import { Component, OnInit } from '@angular/core';
import { LocalService } from 'src/app/services/common/local.service';
import { LOCAL_STORAGE_VARIABLE, HardCodeConst } from 'src/app/app.constants';
import { UserRole } from 'src/app/models/enums';
import { UserModel } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { DropdownModel } from 'src/app/models/dropdown.model';
import { HardcodeService } from 'src/app/services/hardcode.service';
import { DatetimeUtils } from 'src/app/utils/dateutil';
import { stringify } from 'querystring';
import { MainLayoutComponent } from '../main-layout/main-layout.component';

@Component({
  selector: 'app-user-profile-update',
  templateUrl: './user-profile-update.component.html',
  styleUrls: ['./user-profile-update.component.css']
})
export class UserProfileUpdateComponent implements OnInit {

  isTeacher = false;
  userName = '';
  model = new UserModel();
  avatar: any;
  imageInfo = '';
  gender: DropdownModel[] = [];
  bsConfig: Partial<BsDatepickerConfig>;
  dateOfBirth: string;
  constructor(private userService: UserService,
              private router: Router,
              private spinner: NgxSpinnerService,
              private hardCodeService: HardcodeService,
              private mainLayout: MainLayoutComponent) { }

  ngOnInit() {
    this.bsConfig = Object.assign({}, {
      containerClass: 'theme-blue',
      dateInputFormat: 'DD/MM/YYYY'
    });
    this.isTeacher = LocalService.getItem(LOCAL_STORAGE_VARIABLE.user_role) === UserRole.Teacher.toString() ? true : false;
    this.userName = LocalService.getUserName();
    this.hardCodeService.getHardcode(HardCodeConst.gender).subscribe(data => {
      this.gender = data;
    });
    this.getUserProfile();
  }

  onChange(event) {
    if (event.target.files && event.target.files[0]) {
      const filesUpload: File = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.avatar = reader.result;
      reader.readAsDataURL(filesUpload);
      this.model.uploadedFile = filesUpload;
      this.imageInfo = filesUpload.name.toString();
    }
  }

  getUserProfile() {
    this.userService.getUserProfile().subscribe(data => {
        this.model = data;
      });
  }

  editProfile(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.model.dateOfBirth = DatetimeUtils.toShortDateTimeFormat(this.model.dateOfBirth);
    this.spinner.show();
    this.userService.editProfile(this.model).subscribe(data => {
        this.spinner.hide();
        this.router.navigate(['/view-profile']);
        this.mainLayout.screenReload();
      },
      error => {
        this.spinner.hide();
        this.getUserProfile();
      }
    );
  }

}

import { Component, OnInit } from '@angular/core';
import { UserModel, UserExperienceModel, UserExperienceModels } from 'src/app/models/user.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { ImageService } from 'src/app/services/image.service';
import { UserService } from 'src/app/services/user.service';
import { LocalService } from 'src/app/services/common/local.service';
import { LOCAL_STORAGE_VARIABLE } from 'src/app/app.constants';
import { UserRole } from 'src/app/models/enums';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mentor-profile-edit',
  templateUrl: './mentor-profile-edit.component.html',
  styleUrls: ['./mentor-profile-edit.component.css']
})
export class MentorProfileEditComponent implements OnInit {

  isTeacher = false;
  userName: any;
  user: UserModel;
  avatar: any;
  mentorId: any;
  isEdit = false;
  imageInfo = '';
  userExp: UserExperienceModel[] = [];
  tmpo: any;
  count = 0;
  arrayOfObj = [];
  UserExperienceModels: UserExperienceModels;
  constructor(private spinner: NgxSpinnerService,
    private imgService: ImageService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.spinner.show();
    this.user = new UserModel();
    this.UserExperienceModels = new UserExperienceModels();
    this.isTeacher = LocalService.getItem(LOCAL_STORAGE_VARIABLE.user_role) === UserRole.Teacher.toString() ? true : false;
    this.userName = LocalService.getUserName();
    this.getUserProfile();
    for (let i = 0; i < 10; i++) {
      this.userExp[i] = new UserExperienceModel();
    }
    this.spinner.hide();
  }

  onAddRow() {
    this.tmpo = 1;
    this.count ++;
    this.arrayOfObj.push(this.count);
    this.userExp[this.count] = new UserExperienceModel();
    }

  onChange(event) {
    if (event.target.files && event.target.files[0]) {
      const filesUpload: File = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.avatar = reader.result;
      reader.readAsDataURL(filesUpload);
      this.user.uploadedFile = filesUpload;
      this.imageInfo = filesUpload.name.toString();
    }
  }

  getUserProfile() {
    this.userService.getUserProfile().subscribe(data => {
        this.user = data;
        console.log(this.user.exp);
        console.log(this.user.exp.counter);
        setTimeout(() => {
          this.imgService.getPictureUrl(this.user.avatar);
        }, 500);
        this.tmpo = this.user.exp.counter;
        this.count = this.tmpo - 1;
        this.arrayOfObj.push(this.count);
        this.userExp = this.user.exp.userExperienceModel;
        console.log(this.userExp);
      });
  }

  editMentorProfile(form: NgForm) {
    if (form.invalid) { return; }
    this.UserExperienceModels.userExperienceModel = this.userExp;
    this.UserExperienceModels.counter = this.count;
    this.userService.editProfile(this.user).subscribe(() => {
      this.userService.editExperiment(this.UserExperienceModels).subscribe(() => {
        this.router.navigate(['/view-profile']);
      });
    });
  }
}

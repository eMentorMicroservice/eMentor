import { Component, OnInit } from '@angular/core';
import { UserModel, Experience } from 'src/app/models/user.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { ImageService } from 'src/app/services/image.service';
import { UserService } from 'src/app/services/user.service';
import { LocalService } from 'src/app/services/common/local.service';
import { LOCAL_STORAGE_VARIABLE } from 'src/app/app.constants';
import { UserRole } from 'src/app/models/enums';
import { NgForm } from '@angular/forms';
import { threadId } from 'worker_threads';
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
  tmpo: any;
  count = 0;
  arrayOfObj = [];
  constructor(private spinner: NgxSpinnerService,
    private imgService: ImageService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.spinner.show();
    this.user = new UserModel();
    this.isTeacher = LocalService.getItem(LOCAL_STORAGE_VARIABLE.user_role) === UserRole.Teacher.toString() ? true : false;
    this.userName = LocalService.getUserName();
    this.getUserProfile();

    this.spinner.hide();
  }

  onAddRow() {
    this.tmpo = 1;
    this.count ++;
    this.arrayOfObj.push(this.count);
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
        console.log(data);
        console.log(this.user.exp);
        setTimeout(() => {
          this.imgService.getPictureUrl(this.user.avatar);
        }, 500);
        this.tmpo = this.user.exp.length;
        this.count = this.tmpo - 1;
        this.arrayOfObj.push(this.count);
      });
  }

  editMentorProfile(form: NgForm) {
    if (form.invalid) { return; }
    this.userService.editProfile(this.user).subscribe(() => {
      this.router.navigate(['/view-profile']);
    });
  }
}

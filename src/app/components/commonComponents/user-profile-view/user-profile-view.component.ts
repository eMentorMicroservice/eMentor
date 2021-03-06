import { Component, OnInit } from '@angular/core';
import { LocalService } from 'src/app/services/common/local.service';
import { LOCAL_STORAGE_VARIABLE } from 'src/app/app.constants';
import { UserRole } from 'src/app/models/enums';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/app/services/user.service';
import { UserModel } from 'src/app/models/user.model';
import { ImageService } from 'src/app/services/image.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile-view',
  templateUrl: './user-profile-view.component.html',
  styleUrls: ['./user-profile-view.component.css']
})
export class UserProfileViewComponent implements OnInit {
  isTeacher = false;
  userName: any;
  user: UserModel;
  avatar: any;
  mentorId: any;
  isEdit = false;
  imageInfo = '';
  constructor(private spinner: NgxSpinnerService,
    private imgService: ImageService,
    private userService: UserService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.spinner.show();
    this.user = new UserModel();
    this.isTeacher = LocalService.getItem(LOCAL_STORAGE_VARIABLE.user_role) === UserRole.Teacher.toString() ? true : false;
    this.userName = LocalService.getUserName();
    this.getUserProfile();
    this.route.params.subscribe(params => {
      if (!params['id']) {
      } else {
        this.mentorId = +params['id'];
        this.isTeacher = true;
      }
    });
    this.spinner.hide();
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
        setTimeout(() => {
          this.imgService.getPictureUrl(this.user.avatar);
          this.avatar = this.user.avatar;
        }, 500);
      });
  }
}

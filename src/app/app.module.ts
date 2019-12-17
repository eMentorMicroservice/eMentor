import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/commonComponents/login/login.component';
import { RegisterComponent } from './components/commonComponents/register/register.component';
import { AppTextBoxComponent } from './controls/app-text-box/app-text-box.component';
import { InvalidmessageDirective } from './directives/invalid-message.directive';
import { InvalidTypeDirective } from './directives/invalid-type.directive';
import { EqualValidator } from './directives/equal.derective';
import { MaxValidator } from './directives/max.directive';
import { MinValidator } from './directives/min.directive';
import { PasswordValidator } from './directives/password.derective';
import { PhoneValidator } from './directives/phone.derective';
import { MinDateValidator } from './directives/mindate.derective';
import { DashboardTeacherComponent } from './components/mentorComponents/dashboard-teacher/dashboard-teacher.component';
import { DashboardStudentComponent } from './components/studentComponents/dashboard-student/dashboard-studentcomponent';
import { ImagePipe } from './pipes/image.pipe';
import { AppNumberPipe } from './pipes/number.pipe';
import { ChangePasswordComponent } from './components/commonComponents/change-password/change-password.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NotFoundComponent } from './components/commonComponents/not-found/not-found.component';
import { AppRoutingModule } from './app.routing.module';
import { AppDatePickerComponent } from './controls/date-picker/date-picker.component';
import { AppDropdownListComponent } from './controls/dropdown-list/dropdown-list.component';
import { DatepickerModule, BsDatepickerModule, TimepickerModule, BsModalRef, ModalModule } from 'ngx-bootstrap';
import { LoginAccessGuard } from './guards/login.guard';
import { AdminAccessGuard } from './guards/admin.guard.';
import { ErrorService } from './services/common/error.service';
import { GlobalService } from './services/global.service';
import { SearchBoxComponent } from './controls/search-box/search-box.component';
import { UploadCourseComponent } from './components/mentorComponents/upload-course/upload-course.component';
import { UploadCourseViewComponent } from './components/mentorComponents/upload-course-view/upload-course-view.component';
import { MentorMainlayoutComponent } from './components/mentorComponents/mentor-mainlayout/mentor-mainlayout.component';
import { UserProfileUpdateComponent } from './components/commonComponents/user-profile-update/user-profile-update.component';
import { MainLayoutComponent } from './components/studentComponents/student-mainlayout/main-layout.component';
import { UserProfileViewComponent } from './components/commonComponents/user-profile-view/user-profile-view.component';
import { ClassroomComponent } from './components/classroom/classroom.component';
import { ActionCableService } from 'angular2-actioncable';

@NgModule({
  declarations: [
    // tslint:disable-next-line: comment-format
    //directives
    InvalidmessageDirective,
    InvalidTypeDirective,

    // tslint:disable-next-line: comment-format
    //pipes
    ImagePipe,
    AppNumberPipe,

    // tslint:disable-next-line: comment-format
    //validators
    EqualValidator,
    MaxValidator,
    MinValidator,
    PasswordValidator,
    PhoneValidator,
    MinDateValidator,

    // tslint:disable-next-line: comment-format
    //custom components
    AppTextBoxComponent,
    AppDatePickerComponent,
    AppDropdownListComponent,
    SearchBoxComponent,


    // tslint:disable-next-line: comment-format
    //components
    AppComponent,
    ClassroomComponent,
    DashboardStudentComponent,
    RegisterComponent,
    LoginComponent,
    DashboardTeacherComponent,
    ChangePasswordComponent,
    UserProfileUpdateComponent,
    UserProfileViewComponent,
    NotFoundComponent,
    MainLayoutComponent,
    UploadCourseComponent,
    UploadCourseViewComponent,
    MentorMainlayoutComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    NgxSpinnerModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    ModalModule.forRoot(),
    DatepickerModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [
        LoginAccessGuard,
        AdminAccessGuard,
        ErrorService,
        GlobalService,
        BsModalRef,
        ActionCableService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

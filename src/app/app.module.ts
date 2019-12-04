import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ClassroomComponent } from './components/classroom/classroom.component';

import { AppTextBoxComponent } from './controls/app-text-box/app-text-box.component';
import { InvalidmessageDirective } from './directives/invalid-message.directive';
import { InvalidTypeDirective } from './directives/invalid-type.directive';
import { EqualValidator } from './directives/equal.derective';
import { MaxValidator } from './directives/max.directive';
import { MinValidator } from './directives/min.directive';
import { PasswordValidator } from './directives/password.derective';
import { PhoneValidator } from './directives/phone.derective';
import { MinDateValidator } from './directives/mindate.derective';
import { ActionCableService } from 'angular2-actioncable';
import { DashboardTeacherComponent } from './components/dashboard-teacher/dashboard-teacher.component';
import { DashboardStudentComponent } from './components/dashboard-student/dashboard-studentcomponent';
import { ImagePipe } from './pipes/image.pipe';
import { AppNumberPipe } from './pipes/number.pipe';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { UserProfileUpdateComponent } from './components/user-profile-update/user-profile-update.component';
import { UserProfileViewComponent } from './components/user-profile-view/user-profile-view.component';

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
    //components
    AppComponent,
    ClassroomComponent,
    DashboardStudentComponent,
    RegisterComponent,
    LoginComponent,
    AppTextBoxComponent,
    DashboardTeacherComponent,
    ChangePasswordComponent,
    UserProfileUpdateComponent,
    UserProfileViewComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      { path: 'classroom', component: ClassroomComponent, pathMatch: 'full' },
      { path: '', component: LoginComponent, pathMatch: 'full' },
      { path: 'change-password', component: ChangePasswordComponent, pathMatch: 'full' },
      { path: 'home-student', component: DashboardStudentComponent, pathMatch: 'full' },
      { path: 'home-teacher', component: DashboardTeacherComponent, pathMatch: 'full' },
      { path: 'register', component: RegisterComponent, pathMatch: 'full' },
      { path: 'view-profile', component: UserProfileViewComponent, pathMatch: 'full'},
      { path: 'edit-profile', component: UserProfileUpdateComponent, pathMatch: 'full'}
    ])
  ],
  providers: [ActionCableService],
  bootstrap: [AppComponent]
})
export class AppModule { }

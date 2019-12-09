import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AppTextBoxComponent } from './controls/app-text-box/app-text-box.component';
import { InvalidmessageDirective } from './directives/invalid-message.directive';
import { InvalidTypeDirective } from './directives/invalid-type.directive';
import { EqualValidator } from './directives/equal.derective';
import { MaxValidator } from './directives/max.directive';
import { MinValidator } from './directives/min.directive';
import { PasswordValidator } from './directives/password.derective';
import { PhoneValidator } from './directives/phone.derective';
import { MinDateValidator } from './directives/mindate.derective';
import { DashboardTeacherComponent } from './components/dashboard-teacher/dashboard-teacher.component';
import { DashboardStudentComponent } from './components/dashboard-student/dashboard-studentcomponent';
import { ImagePipe } from './pipes/image.pipe';
import { AppNumberPipe } from './pipes/number.pipe';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { UserProfileUpdateComponent } from './components/user-profile-update/user-profile-update.component';
import { UserProfileViewComponent } from './components/user-profile-view/user-profile-view.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AppRoutingModule } from './app.routing.module';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { AppDatePickerComponent } from './controls/date-picker/date-picker.component';
import { AppDropdownListComponent } from './controls/dropdown-list/dropdown-list.component';
import { DatepickerModule, BsDatepickerModule, TimepickerModule, BsModalRef, ModalModule } from 'ngx-bootstrap';
import { LoginAccessGuard } from './guards/login.guard';
import { AdminAccessGuard } from './guards/admin.guard.';
import { ErrorService } from './services/common/error.service';
import { GlobalService } from './services/global.service';

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


    // tslint:disable-next-line: comment-format
    //components
    AppComponent,
    DashboardStudentComponent,
    RegisterComponent,
    LoginComponent,
    DashboardTeacherComponent,
    ChangePasswordComponent,
    UserProfileUpdateComponent,
    UserProfileViewComponent,
    NotFoundComponent,
    MainLayoutComponent
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
    TimepickerModule.forRoot()
  ],
  providers: [
        LoginAccessGuard,
        AdminAccessGuard,
        ErrorService,
        GlobalService,
        BsModalRef
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

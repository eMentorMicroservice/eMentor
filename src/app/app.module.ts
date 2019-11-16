import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
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
@NgModule({
  declarations: [
    //components
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    ClassroomComponent,
    AppTextBoxComponent,
    //directives
    InvalidmessageDirective,
    InvalidTypeDirective,
    //validators
    EqualValidator,
    MaxValidator,
    MinValidator,
    PasswordValidator,
    PhoneValidator,
    MinDateValidator
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
      { path: 'home', component: HomeComponent, pathMatch: 'full' },
      { path: 'register', component: RegisterComponent, pathMatch: 'full' },
    ])
  ],
  providers: [ActionCableService],
  bootstrap: [AppComponent]
})
export class AppModule { }

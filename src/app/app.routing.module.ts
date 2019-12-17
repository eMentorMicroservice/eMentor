import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/commonComponents/login/login.component';
import { ChangePasswordComponent } from './components/commonComponents/change-password/change-password.component';
import { DashboardStudentComponent } from './components/studentComponents/dashboard-student/dashboard-studentcomponent';
import { NotFoundComponent } from './components/commonComponents/not-found/not-found.component';
import { MainLayoutComponent } from './components/commonComponents/main-layout/main-layout.component';
import { UserProfileViewComponent } from './components/studentComponents/user-profile-view/user-profile-view.component';
import { UserProfileUpdateComponent } from './components/studentComponents/user-profile-update/user-profile-update.component';
import { DashboardTeacherComponent } from './components/mentorComponents/dashboard-teacher/dashboard-teacher.component';
import { RegisterComponent } from './components/commonComponents/register/register.component';
import { UploadCourseViewComponent } from './components/mentorComponents/upload-course-view/upload-course-view.component';
import { UploadCourseComponent } from './components/mentorComponents/upload-course/upload-course.component';
import { MentorMainlayoutComponent } from './components/mentorComponents/mentor-mainlayout/mentor-mainlayout.component';

const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            { path: '', component: DashboardStudentComponent, outlet: 'student'},
            { path: 'view-profile', component: UserProfileViewComponent, pathMatch: 'full', outlet: 'student'},
            { path: 'edit-profile', component: UserProfileUpdateComponent, pathMatch: 'full', outlet: 'student'},
        ]
    },
    {
        path: 'login',
        component: LoginComponent,
        pathMatch: 'full',
    },
    {
        path: 'mentor-home',
        component: MentorMainlayoutComponent,
        children: [
            {
                path: 'mentor-home',
                component: DashboardTeacherComponent,
                outlet: 'mentor'
            },
            {
                path: 'view-course',
                component: UploadCourseViewComponent,
                pathMatch: 'full',
                outlet: 'mentor'
            },
            {
                path: 'upload-course',
                component: UploadCourseComponent,
                pathMatch: 'full',
                outlet: 'mentor'
            }
        ]
    },
    {
        path: 'register',
        component: RegisterComponent,
        pathMatch: 'full'
    },
    {
        path: 'change-password',
        component: ChangePasswordComponent,
        pathMatch: 'full',
    },
    {
        path: '404',
        component: NotFoundComponent,
        pathMatch: 'full',
    },
    {
        path: '**',
        redirectTo: '/404'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

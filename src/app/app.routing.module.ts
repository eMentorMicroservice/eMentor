import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/commonComponents/login/login.component';
import { ChangePasswordComponent } from './components/commonComponents/change-password/change-password.component';
import { NotFoundComponent } from './components/commonComponents/not-found/not-found.component';
import { RegisterComponent } from './components/commonComponents/register/register.component';
import { UploadCourseViewComponent } from './components/mentorComponents/upload-course-view/upload-course-view.component';
import { UploadCourseComponent } from './components/mentorComponents/upload-course/upload-course.component';
import { MainLayoutComponent } from './components/commonComponents/main-layout/main-layout.component';
import { UserProfileViewComponent } from './components/commonComponents/user-profile-view/user-profile-view.component';
import { UserProfileUpdateComponent } from './components/commonComponents/user-profile-update/user-profile-update.component';
import { ClassroomComponent } from './components/classroom/classroom.component';
import { DashboardComponent } from './components/commonComponents/dashboard/dashboard.component';

const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            { path: '', component: DashboardComponent},
            { path: 'view-profile', component: UserProfileViewComponent, pathMatch: 'full'},
            { path: 'edit-profile', component: UserProfileUpdateComponent, pathMatch: 'full'},
            {
                path: 'view-course',
                component: UploadCourseViewComponent,
                pathMatch: 'full',
            },
            {
                path: 'edit-course/:id',
                component: UploadCourseComponent,
                pathMatch: 'full',
            },
            {
                path: 'upload-course',
                component: UploadCourseComponent,
                pathMatch: 'full',
            }
        ]
    },
    {
        path: 'login',
        component: LoginComponent,
        pathMatch: 'full',
    },
    {
        path: 'classroom',
        component: ClassroomComponent,
        pathMatch: 'full'
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

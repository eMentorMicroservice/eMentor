import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginAccessGuard } from './guards/login.guard';
import { LoginComponent } from './components/login/login.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { DashboardStudentComponent } from './components/dashboard-student/dashboard-studentcomponent';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { UserProfileViewComponent } from './components/user-profile-view/user-profile-view.component';
import { UserProfileUpdateComponent } from './components/user-profile-update/user-profile-update.component';
import { DashboardTeacherComponent } from './components/dashboard-teacher/dashboard-teacher.component';
import { RegisterComponent } from './components/register/register.component';
import { ClassroomComponent } from './components/classroom/classroom.component';

const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            { path: '', component: DashboardStudentComponent},
            { path: 'view-profile', component: UserProfileViewComponent, pathMatch: 'full'},
            { path: 'edit-profile', component: UserProfileUpdateComponent, pathMatch: 'full'}
        ]
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    { path: 'classroom', component: ClassroomComponent, pathMatch: 'full' },

    {
        path: 'home-teacher',
        component: DashboardTeacherComponent,
        pathMatch: 'full' },
    {
        path: 'register',
        component: RegisterComponent,
        pathMatch: 'full' },
    {
        path: 'change-password',
        component: ChangePasswordComponent
    },
    {
        path: '404',
        component: NotFoundComponent
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

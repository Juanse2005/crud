import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddEditUserComponent } from './components/add-edit-user/add-edit-user.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [ 
    {path: 'login', component: LoginComponent},
    {path: 'sign-up', component: SignUpComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'add-user', component: AddEditUserComponent },
    {path: 'edit-user/:id', component: AddEditUserComponent },
    {path: 'home', component: HomeComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
];
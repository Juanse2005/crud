import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'home', loadComponent: () => import('./components/home/home.component').then(c => c.HomeComponent) },
  //{ path: 'login', loadComponent: () => import('./components/login/login.component').then(c => c.LoginComponent) },
  //{ path: 'sign-up', loadComponent: () => import('./components/sign-up/sign-up.component').then(c => c.SignUpComponent) },
  { path: 'dashboard', loadComponent: () => import('./components/dashboard/dashboard.component').then(c => c.DashboardComponent) },
  { path: 'add-user', loadComponent: () => import('./components/add-edit-user/add-edit-user.component').then(c => c.AddEditUserComponent) },
  { path: 'edit-user/:id', loadComponent: () => import('./components/add-edit-user/add-edit-user.component').then(c => c.AddEditUserComponent) },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

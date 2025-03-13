import { Routes } from '@angular/router';
import { LoginComponent } from './Componente/login/login.component';
import { DashboardComponent } from './Componente/Dashboard/dashboard/dashboard.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent }, 
   { path: '', redirectTo: '/login', pathMatch: 'full' },
   {path: "dashboard", component:DashboardComponent },
];

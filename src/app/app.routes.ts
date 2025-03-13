import { Routes } from '@angular/router';
import { DashboardComponent } from './Componente/Dashboard/dashboard/dashboard.component';
import { MedicinaFormComponent } from './Componente/Formulario/medicina-form/medicina-form.component';
import { ProveedorFormComponent } from './Componente/Formulario/proveedor-form/proveedor-form.component';
import { RegistroAlimentoFormComponent } from './Componente/Formulario/registro-alimento-form/registro-alimento-form.component';
import { RegistroMedicinaFormComponent } from './Componente/Formulario/registro-medicina-form/registro-medicina-form.component';
import { UsuarioFormComponent } from './Componente/Formulario/usuario-form/usuario-form.component';
import { VentaFormComponent } from './Componente/Formulario/venta-form/venta-form.component';
import { LoginComponent } from './Componente/login/login.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent }, 
   { path: '', redirectTo: '/login', pathMatch: 'full' },
   {path: "dashboard", component:DashboardComponent },
   {path: "medicina", component:MedicinaFormComponent},
   {path: "proveedor", component:ProveedorFormComponent},
   {path: "registro-alimento", component: RegistroAlimentoFormComponent},
   {path:"registro-medicina", component: RegistroMedicinaFormComponent},
   {path:"usuario-form", component: UsuarioFormComponent},
   {path: "venta-form", component:VentaFormComponent}
];

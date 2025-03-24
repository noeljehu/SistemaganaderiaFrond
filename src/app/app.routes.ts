import { Routes } from '@angular/router';
import { DashboardComponent } from './Componente/Dashboard/dashboard/dashboard.component';
import { UsuarioFormComponent } from './Componente/Formulario/usuario-form/usuario-form.component';
import { ClienteFormComponent } from './Componente/Formulario/cliente-form/cliente-form.component';
import { ProveedorFormComponent } from './Componente/Formulario/proveedor-form/proveedor-form.component';
import { EstabloFormComponent } from './Componente/Formulario/establo-form/establo-form.component';
import { CorralFormComponent } from './Componente/Formulario/corral-form/corral-form.component';
import { GanadoFormComponent } from './Componente/Formulario/ganado-form/ganado-form.component';
import { HistorialClinicoFormComponent } from './Componente/Formulario/historial-clinico-form/historial-clinico-form.component';
import { AlimentoFormComponent } from './Componente/Formulario/alimento-form/alimento-form.component';
import { RegistroAlimentoFormComponent } from './Componente/Formulario/registro-alimento-form/registro-alimento-form.component';
import { MedicinaFormComponent } from './Componente/Formulario/medicina-form/medicina-form.component';
import { RegistroMedicinaFormComponent } from './Componente/Formulario/registro-medicina-form/registro-medicina-form.component';
import { VentaFormComponent } from './Componente/Formulario/venta-form/venta-form.component';
import { LoginComponent } from './Componente/login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },

  { 
    path: 'dashboard', 
    component: DashboardComponent, // Dashboard carga los formularios dentro
    children: [
      { path: 'inicio', component: UsuarioFormComponent }, 
      { path: 'usuario', component: UsuarioFormComponent }, 
      { path: 'cliente', component: ClienteFormComponent },
      { path: 'proveedor', component: ProveedorFormComponent },
      { path: 'establo', component: EstabloFormComponent },
      { path: 'corral', component: CorralFormComponent },
      { path: 'ganado', component: GanadoFormComponent },
      { path: 'historial-clinico', component: HistorialClinicoFormComponent },
      { path: 'alimento', component: AlimentoFormComponent },
      { path: 'registro-alimento', component: RegistroAlimentoFormComponent },
      { path: 'medicina', component: MedicinaFormComponent },
      { path: 'registro-medicina', component: RegistroMedicinaFormComponent },
      { path: 'venta', component: VentaFormComponent }
    ] 
  }
];
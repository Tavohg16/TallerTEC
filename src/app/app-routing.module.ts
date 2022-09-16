import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { CitaComponent } from './cita/cita.component';
import { ClienteComponent } from './cliente/cliente.component';
import { GestionCitasComponent } from './gestion-citas/gestion-citas.component';
import { GestionClientesComponent } from './gestion-clientes/gestion-clientes.component';
import { GestionTrabajadoresComponent } from './gestion-trabajadores/gestion-trabajadores.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { 
  AuthGuardService as AuthGuard 
} from './services/auth-guard.service';
import { TrabajadorComponent } from './trabajador/trabajador.component';

/**
 * Definiendo rutas a componentes
 */
const routes: Routes = [
  { path: 'home', component: HomeComponent ,  pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent ,  pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'gestion-trabajadores', component: GestionTrabajadoresComponent ,  pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'trabajador', component: TrabajadorComponent ,  pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'gestion-clientes', component: GestionClientesComponent ,  pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'cliente', component: ClienteComponent ,  pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'gestion-citas', component: GestionCitasComponent ,  pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'cita', component: CitaComponent ,  pathMatch: 'full', canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

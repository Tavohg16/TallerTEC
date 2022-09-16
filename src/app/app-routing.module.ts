import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { GestionTrabajadoresComponent } from './gestion-trabajadores/gestion-trabajadores.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { 
  AuthGuardService as AuthGuard 
} from './services/auth-guard.service';

/**
 * Definiendo rutas a componentes
 */
const routes: Routes = [
  { path: 'home', component: HomeComponent ,  pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent ,  pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'gestion-trabajadores', component: GestionTrabajadoresComponent ,  pathMatch: 'full', canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

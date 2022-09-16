import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './services/auth-guard.service';
import { GestionTrabajadoresComponent } from './gestion-trabajadores/gestion-trabajadores.component';
import { TrabajadorComponent } from './trabajador/trabajador.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GestionClientesComponent } from './gestion-clientes/gestion-clientes.component';
import { ClienteComponent } from './cliente/cliente.component';
import { GestionCitasComponent } from './gestion-citas/gestion-citas.component';
import { CitaComponent } from './cita/cita.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    GestionTrabajadoresComponent,
    TrabajadorComponent,
    GestionClientesComponent,
    ClienteComponent,
    GestionCitasComponent,
    CitaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { 
}

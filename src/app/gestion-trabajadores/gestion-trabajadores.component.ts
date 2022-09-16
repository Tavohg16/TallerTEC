import { Component, OnInit } from '@angular/core';
import { TrabajadoresService } from '../services/trabajadores/trabajadores.service';
import { Trabajador, TrabajadorResponse } from '../services/trabajadores/trabajadores.types';

@Component({
  selector: 'app-gestion-trabajadores',
  templateUrl: './gestion-trabajadores.component.html',
  styleUrls: ['./gestion-trabajadores.component.css']
})
export class GestionTrabajadoresComponent implements OnInit {

  protected trabajadores: Trabajador[] = [];

  constructor(private trabajadoresService: TrabajadoresService) { }

  ngOnInit(): void {
    this.trabajadoresService
      .todosTrabajadores()
      .subscribe({
        next: (trabajadoresResponse: TrabajadorResponse) => {
          if (trabajadoresResponse.exito) {
            this.trabajadores = trabajadoresResponse.trabajadores;
          } else {
            alert('Error al obtener trabajadores.');
          }
        },
        error: (error) => {
          alert('Error al obtener trabajadores.');
          console.log(error);
        },
      });
  }

}

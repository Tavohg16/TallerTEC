import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrabajadoresService } from '../services/trabajadores/trabajadores.service';
import {
  Trabajador,
  TrabajadoresResponse,
} from '../services/trabajadores/trabajadores.types';

@Component({
  selector: 'app-gestion-trabajadores',
  templateUrl: './gestion-trabajadores.component.html',
  styleUrls: ['./gestion-trabajadores.component.css'],
})
export class GestionTrabajadoresComponent implements OnInit {
  protected trabajadores: Trabajador[] = [];

  constructor(
    private trabajadoresService: TrabajadoresService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.trabajadoresService.todosTrabajadores().subscribe({
      next: (trabajadoresResponse: TrabajadoresResponse) => {
        if (trabajadoresResponse.exito) {
          this.trabajadores = trabajadoresResponse.trabajadores.sort(
            (trabajadorA, trabajadorB) => {
              return this.nombreCompleto(trabajadorA).localeCompare(
                this.nombreCompleto(trabajadorB)
              );
            }
          );
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

  protected nombreCompleto(trabajador: Trabajador): string {
    return `${trabajador.nombre} ${trabajador.primer_apellido} ${trabajador.segundo_apellido}`;
  }

  protected fechaIngreso(trabajador: Trabajador): string {
    const fecha = new Date(
      trabajador.ano_ingreso,
      trabajador.mes_ingreso - 1,
      trabajador.dia_ingreso
    );
    return fecha.toLocaleDateString('es');
  }

  protected fechaNacimiento(trabajador: Trabajador): string {
    const fecha = new Date(
      trabajador.ano_nacimiento,
      trabajador.mes_nacimiento - 1,
      trabajador.dia_nacimiento
    );
    return fecha.toLocaleDateString('es');
  }

  protected edad(trabajador: Trabajador): string {
    const today = new Date();
    const birthDate = new Date(
      trabajador.ano_nacimiento,
      trabajador.mes_nacimiento - 1,
      trabajador.dia_nacimiento
    );

    const yearsDifference = today.getFullYear() - birthDate.getFullYear();

    if (
      today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() < birthDate.getDate())
    ) {
      return (yearsDifference - 1).toString();
    }

    return yearsDifference.toString();
  }

  protected crearTrabajador() {
    this.router.navigate(['trabajador']);
  }

  protected editarTrabajador(trabajador: Trabajador) {
    this.router.navigate(['trabajador'], { state: trabajador });
  }
}

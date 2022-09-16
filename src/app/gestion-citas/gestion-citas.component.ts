import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CitasService } from '../services/citas/citas.service';
import {
  Cita,
  CitaResponse,
  CitasResponse,
  FacturaResponse,
} from '../services/citas/citas.types';

@Component({
  selector: 'app-gestion-citas',
  templateUrl: './gestion-citas.component.html',
  styleUrls: ['./gestion-citas.component.css'],
})
export class GestionCitasComponent implements OnInit {
  protected citas: Cita[] = [];

  constructor(private citasService: CitasService, private router: Router) {}

  ngOnInit(): void {
    this.citasService.todasCitas().subscribe({
      next: (citasResponse: CitasResponse) => {
        if (citasResponse.exito) {
          this.citas = citasResponse.citas.sort(
            (citaA, citaB) =>
              Number(
                new Date(citaA.ano_cita, citaA.mes_cita - 1, citaA.dia_cita)
              ) -
              Number(
                new Date(citaB.ano_cita, citaB.mes_cita - 1, citaB.dia_cita)
              )
          );
        } else {
          alert('Error al obtener citas.');
        }
      },
      error: (error) => {
        alert('Error al obtener citas.');
        console.log(error);
      },
    });
  }

  protected fechaCita(cita: Cita): string {
    const fecha = new Date(cita.ano_cita, cita.mes_cita - 1, cita.dia_cita);
    return fecha.toLocaleDateString('es');
  }

  protected crearCita() {
    this.router.navigate(['cita']);
  }

  protected facturarCita(cita: Cita) {
    this.citasService.generarFactura(cita.id).subscribe({
      next: (facturaResponse: FacturaResponse) => {
        alert(facturaResponse.mensaje);
      },
      error: (error) => {
        alert(`Error al facturar cita.`);
        console.log(error);
      },
    });
  }
}

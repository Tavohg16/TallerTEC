import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CitasService } from '../services/citas/citas.service';
import { Cita, CitaResponse } from '../services/citas/citas.types';

@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.css'],
})
export class CitaComponent implements OnInit {
  protected title: string = 'Crear cita';
  protected citaForm: FormGroup;
  protected loading: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private citaService: CitasService
  ) {
    this.citaForm = this.formBuilder.group({
      id: [null, Validators.required],
      placa_vehiculo: [null, Validators.required],
      sucursal: ['San José', Validators.required],
      cedula_cliente: [
        null,
        [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
      ],
      servicio: ['Cambio de aceite', Validators.required],
      fechaCita: [null, Validators.required],
    });
  }

  ngOnInit(): void {}

  // Getter para acceder facilmente a los form fields
  get citaFormControls() {
    return this.citaForm.controls;
  }

  onSubmit() {
    // Caso en el que el form es inválido
    if (this.citaForm.invalid) {
      return;
    }

    // Query a través del loggin service para validar los credenciales.
    this.loading = true;
    this.citaService
      .crearCita(this.formatoCita(this.citaForm.value))
      .subscribe({
        next: (citaResponse: CitaResponse) => {
          alert(citaResponse.mensaje);
          this.router.navigate(['gestion-citas']);
          this.loading = false;
        },
        error: (error) => {
          alert(`Error al crear la cita.`);
          console.log(error);
          this.loading = false;
        },
      });
  }

  formatoCita(citaFormValues: any) {
    return {
      id: citaFormValues.id,
      cedula_cliente: citaFormValues.cedula_cliente,
      placa_vehiculo: citaFormValues.placa_vehiculo,
      dia_cita: citaFormValues.fechaCita.day,
      mes_cita: citaFormValues.fechaCita.month,
      ano_cita: citaFormValues.fechaCita.year,
      sucursal: citaFormValues.sucursal,
      servicio: citaFormValues.servicio,
      estado: true,
    } as Cita;
  }
}

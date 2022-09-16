import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TrabajadoresService } from '../services/trabajadores/trabajadores.service';
import {
  Trabajador,
  TrabajadorResponse,
} from '../services/trabajadores/trabajadores.types';

@Component({
  selector: 'app-trabajador',
  templateUrl: './trabajador.component.html',
  styleUrls: ['./trabajador.component.css'],
})
export class TrabajadorComponent implements OnInit {
  protected params: any;
  protected formType: string;
  protected title: string;
  protected trabajadorForm: FormGroup;
  protected loading: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private trabajadorService: TrabajadoresService
  ) {
    this.params = router.getCurrentNavigation()?.extras.state;
    if (!this.params) {
      this.formType = 'crear';
      this.title = 'Crear trabajador';
      this.trabajadorForm = this.formBuilder.group({
        nombre: [null, Validators.required],
        primer_apellido: [null, Validators.required],
        segundo_apellido: [null, Validators.required],
        cedula: [
          null,
          [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
        ],
        contrasena: [null, Validators.required],
        fechaIngreso: [null, Validators.required],
        fechaNacimiento: [null, Validators.required],
        rol: ['Ayudante de mecanico', Validators.required],
      });
    } else {
      this.formType = 'editar';
      this.title = 'Editar trabajador';
      this.trabajadorForm = this.formBuilder.group({
        nombre: [this.params.nombre, Validators.required],
        primer_apellido: [this.params.primer_apellido, Validators.required],
        segundo_apellido: [this.params.segundo_apellido, Validators.required],
        cedula: [{value: this.params.cedula.toString(), disabled: true}, Validators.required],
        contrasena: [this.params.contrasena, Validators.required],
        fechaIngreso: [
          {
            year: this.params.ano_ingreso,
            month: this.params.mes_ingreso,
            day: this.params.dia_ingreso,
          },
          Validators.required,
        ],
        fechaNacimiento: [
          {
            year: this.params.ano_nacimiento,
            month: this.params.mes_nacimiento,
            day: this.params.dia_nacimiento,
          },
          Validators.required,
        ],
        rol: [this.params.rol, Validators.required],
      });
    }
  }

  ngOnInit(): void {
  }

  // Getter para acceder facilmente a los form fields
  get trabajadorFormControls() {
    return this.trabajadorForm.controls;
  }

  onSubmit() {
    // Caso en el que el form es inválido
    if (this.trabajadorForm.invalid) {
      return;
    }

    // Query a través del loggin service para validar los credenciales.
    this.loading = true;
    if (this.formType === 'crear') {
      this.trabajadorService
        .crearTrabajador(this.formatoTrabajador(this.trabajadorForm.value))
        .subscribe({
          next: (trabajadorResponse: TrabajadorResponse) => {
            alert(trabajadorResponse.mensaje);
            this.router.navigate(['gestion-trabajadores']);
            this.loading = false;
          },
          error: (error) => {
            alert(`Error al ${this.formType} trabajador.`);
            console.log(error);
            this.loading = false;
          },
        });
    } else {
      this.trabajadorService
        .editarTrabajador(this.formatoTrabajador(this.trabajadorForm.value))
        .subscribe({
          next: (trabajadorResponse: TrabajadorResponse) => {
            alert(trabajadorResponse.mensaje);
            this.router.navigate(['gestion-trabajadores']);
            this.loading = false;
          },
          error: (error) => {
            alert(`Error al ${this.formType} trabajador.`);
            console.log(error);
            this.loading = false;
          },
        });
    }
  }

  formatoTrabajador(trabajadorFormValues: any) {
    return this.formType === 'editar'
      ? ({
          nombre: trabajadorFormValues.nombre,
          primer_apellido: trabajadorFormValues.primer_apellido,
          segundo_apellido: trabajadorFormValues.segundo_apellido,
          cedula: this.params.cedula,
          contrasena: trabajadorFormValues.contrasena,
          dia_ingreso: trabajadorFormValues.fechaIngreso.day,
          mes_ingreso: trabajadorFormValues.fechaIngreso.month,
          ano_ingreso: trabajadorFormValues.fechaIngreso.year,
          dia_nacimiento: trabajadorFormValues.fechaNacimiento.day,
          mes_nacimiento: trabajadorFormValues.fechaNacimiento.month,
          ano_nacimiento: trabajadorFormValues.fechaNacimiento.year,
          rol: trabajadorFormValues.rol,
        } as Trabajador)
      : ({
          nombre: trabajadorFormValues.nombre,
          primer_apellido: trabajadorFormValues.primer_apellido,
          segundo_apellido: trabajadorFormValues.segundo_apellido,
          cedula: trabajadorFormValues.cedula,
          contrasena: trabajadorFormValues.contrasena,
          dia_ingreso: trabajadorFormValues.fechaIngreso.day,
          mes_ingreso: trabajadorFormValues.fechaIngreso.month,
          ano_ingreso: trabajadorFormValues.fechaIngreso.year,
          dia_nacimiento: trabajadorFormValues.fechaNacimiento.day,
          mes_nacimiento: trabajadorFormValues.fechaNacimiento.month,
          ano_nacimiento: trabajadorFormValues.fechaNacimiento.year,
          rol: trabajadorFormValues.rol,
        } as Trabajador);
  }
}

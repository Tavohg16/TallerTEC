import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientesService } from '../services/clientes/clientes.service';
import { Cliente, ClienteResponse } from '../services/clientes/clientes.types';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
})
export class ClienteComponent implements OnInit {
  protected params: any;
  protected formType: string;
  protected title: string;
  protected clienteForm: FormGroup;
  protected loading: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private clienteService: ClientesService
  ) {
    this.params = router.getCurrentNavigation()?.extras.state;
    if (!this.params) {
      this.formType = 'crear';
      this.title = 'Crear cliente';
      this.clienteForm = this.formBuilder.group({
        nombre: [null, Validators.required],
        primer_apellido: [null, Validators.required],
        segundo_apellido: [null, Validators.required],
        cedula: [
          null,
          [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
        ],
        usuario: [null, Validators.required],
        correo: [null, [Validators.required, Validators.email]],
        direccion_1: [null, Validators.required],
        direccion_2: [null],
        telefono_1: [
          null,
          [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
        ],
        telefono_2: [
          null,
          Validators.pattern(/^-?(0|[1-9]\d*)?$/),
        ],
      });
    } else {
      this.formType = 'editar';
      this.title = 'Editar cliente';
      this.clienteForm = this.formBuilder.group({
        nombre: [this.params.nombre, Validators.required],
        primer_apellido: [this.params.primer_apellido, Validators.required],
        segundo_apellido: [this.params.segundo_apellido, Validators.required],
        cedula: [
          {value: this.params.cedula, disabled: true},
          [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
        ],
        usuario: [this.params.usuario, Validators.required],
        correo: [this.params.correo, [Validators.required, Validators.email]],
        contrasena: [this.params.contrasena, Validators.required],
        direccion_1: [this.params.direcciones[0], Validators.required],
        direccion_2: [this.params.direcciones[1]],
        telefono_1: [
          this.params.telefonos[0],
          [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
        ],
        telefono_2: [
          this.params.telefonos[1],
          Validators.pattern(/^-?(0|[1-9]\d*)?$/),
        ],
      });
    }
  }

  ngOnInit(): void {}

  // Getter para acceder facilmente a los form fields
  get clienteFormControls() {
    return this.clienteForm.controls;
  }

  onSubmit() {
    // Caso en el que el form es inválido
    if (this.clienteForm.invalid) {
      return;
    }

    // Query a través del loggin service para validar los credenciales.
    this.loading = true;
    if (this.formType === 'crear') {
      this.clienteService
        .crearCliente(this.formatoCliente(this.clienteForm.value))
        .subscribe({
          next: (clienteResponse: ClienteResponse) => {
            alert(clienteResponse.mensaje);
            this.router.navigate(['gestion-clientes']);
            this.loading = false;
          },
          error: (error) => {
            alert(`Error al ${this.formType} cliente.`);
            console.log(error);
            this.loading = false;
          },
        });
    } else {
      this.clienteService
        .editarCliente(this.formatoCliente(this.clienteForm.value))
        .subscribe({
          next: (clienteResponse: ClienteResponse) => {
            alert(clienteResponse.mensaje);
            this.router.navigate(['gestion-clientes']);
            this.loading = false;
          },
          error: (error) => {
            alert(`Error al ${this.formType} cliente.`);
            console.log(error);
            this.loading = false;
          },
        });
    }
  }

  formatoCliente(clienteFormValues: any) {
    return this.formType === 'editar'
      ? ({
          nombre: clienteFormValues.nombre,
          primer_apellido: clienteFormValues.primer_apellido,
          segundo_apellido: clienteFormValues.segundo_apellido,
          cedula: this.params.cedula,
          usuario: clienteFormValues.usuario,
          correo: clienteFormValues.correo,
          contrasena: clienteFormValues.contrasena,
          telefonos: [
            clienteFormValues.telefono_1,
            clienteFormValues.telefono_2,
          ],
          direcciones: [
            clienteFormValues.direccion_1,
            clienteFormValues.direccion_2,
          ],
        } as Cliente)
      : ({
          nombre: clienteFormValues.nombre,
          primer_apellido: clienteFormValues.primer_apellido,
          segundo_apellido: clienteFormValues.segundo_apellido,
          cedula: clienteFormValues.cedula,
          usuario: clienteFormValues.usuario,
          correo: clienteFormValues.correo,
          telefonos: [
            clienteFormValues.telefono_1,
            clienteFormValues.telefono_2,
          ],
          direcciones: [
            clienteFormValues.direccion_1,
            clienteFormValues.direccion_2,
          ],
        } as Cliente);
  }
}

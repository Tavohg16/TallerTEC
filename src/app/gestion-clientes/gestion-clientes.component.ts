import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientesService } from '../services/clientes/clientes.service';
import {
  Cliente,
  ClientesResponse,
} from '../services/clientes/clientes.types';

@Component({
  selector: 'app-gestion-clientes',
  templateUrl: './gestion-clientes.component.html',
  styleUrls: ['./gestion-clientes.component.css']
})
export class GestionClientesComponent implements OnInit {

  protected clientes: Cliente[] = [];

  constructor(
    private clientesService: ClientesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.clientesService.todosClientes().subscribe({
      next: (clientesResponse: ClientesResponse) => {
        if (clientesResponse.exito) {
          this.clientes = clientesResponse.clientes.sort(
            (clienteA, clienteB) => {
              return this.nombreCompleto(clienteA).localeCompare(
                this.nombreCompleto(clienteB)
              );
            }
          );
        } else {
          alert('Error al obtener clientes.');
        }
      },
      error: (error) => {
        alert('Error al obtener clientes.');
        console.log(error);
      },
    });
  }

  protected nombreCompleto(cliente: Cliente): string {
    return `${cliente.nombre} ${cliente.primer_apellido} ${cliente.segundo_apellido}`;
  }

  protected telefonos(cliente: Cliente): string {
    return cliente.telefonos[1] && cliente.telefonos[1] !== "" ? cliente.telefonos.join(' - ') : cliente.telefonos[0];
  }
  
  protected direcciones(cliente: Cliente): string {
    return cliente.direcciones[1] && cliente.direcciones[1] !== "" ? cliente.direcciones.join(' - ') : cliente.direcciones[0];
  }

  protected crearCliente() {
    this.router.navigate(['cliente']);
  }

  protected editarCliente(cliente: Cliente) {
    this.router.navigate(['cliente'], { state: cliente });
  }

}

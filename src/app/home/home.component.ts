import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  protected options = [
    {
      title: "Gestión de trabajadores",
      icon: "fa-solid fa-user-gear",
      route: "gestion-trabajadores"
    },
    {
      title: "Gestión de clientes",
      icon: "fa-solid fa-users",
      route: "gestion-clientes"
    },
    {
      title: "Registro de citas",
      icon: "fa-solid fa-calendar-check",
      route: "registro-citas"
    },
    {
      title: "Facturación",
      icon: "fa-solid fa-file-invoice-dollar",
      route: "facturacion"
    },
    {
      title: "Reportes",
      icon: "fa-solid fa-chart-line",
      route: "reportes"
    },
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  protected goTo(route: string): void {
    this.router.navigate([route]);
  }

}

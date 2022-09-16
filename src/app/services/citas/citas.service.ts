import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {
  Cita,
  CitasResponse,
  CitaResponse,
  FacturaResponse,
} from './citas.types';

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  // Definiendo ruta a la que se hara los request http relacionados a las citas
  private citasUrl: string = `${environment.apiUrl}/manage/appointment`;

  // Definiendo ruta a la que se hara los request http relacionados a las facturas
  private facturasUrl: string = `${environment.apiUrl}/manage/billing`;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers':
        'X-Requested-With, content-type, Authorization',
    }),
  };

  constructor(private http: HttpClient, private router: Router) {}

  /**
   * Metodo para obtener la lista de todas las citas.
   * @returns observable del query: Observable<CitaResponse[]>.
   */
  todasCitas() {
    return this.http.get<CitasResponse>(
      `${this.citasUrl}/all`,
      this.httpOptions
    );
  }

  crearCita(cita: Cita) {
    const body = JSON.stringify(cita);
    return this.http.post<CitaResponse>(
      this.citasUrl,
      body,
      this.httpOptions
    );
  }

  generarFactura(citaId: string) {
    const body = { id: citaId };
    return this.http.post<FacturaResponse>(
      this.facturasUrl,
      body,
      this.httpOptions
    );
  }
}

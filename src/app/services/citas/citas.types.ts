export interface CitasResponse {
    exito: boolean,
    citas: Cita[],
}

export interface Cita {
    id: string,
    mecanico?: string,
    cedula_cliente: string,
    dia_cita: number
    mes_cita: number
    ano_cita: number,
    placa_vehiculo: string,
    sucursal: string,
    servicio: string,
    estado: boolean,
}

export interface CitaResponse {
    actualizado: boolean,
    mensaje: string,
}

export interface FacturaResponse {
    actualizado: boolean,
    mensaje: string,
}
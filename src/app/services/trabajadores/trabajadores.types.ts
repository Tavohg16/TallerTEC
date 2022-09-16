export interface TrabajadoresResponse {
    exito: boolean,
    trabajadores: Trabajador[],
}

export interface Trabajador {
    nombre: string,
    primer_apellido: string,
    segundo_apellido: string
    cedula: number
    contrasena?: string,
    dia_ingreso: number,
    mes_ingreso: number,
    ano_ingreso: number,
    dia_nacimiento: number,
    mes_nacimiento: number,
    ano_nacimiento: number
    rol: string,
}

export interface TrabajadorResponse {
    actualizado: boolean,
    mensaje: string,
}

export interface TrabajadorResponse {
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
    ano_ingreso: string,
    dia_nacimiento: number,
    mes_naicimiento: number,
    ano_nacimiento: number
    rol: string,
}

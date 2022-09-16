export interface ClientesResponse {
    exito: boolean,
    clientes: Cliente[],
}

export interface Cliente {
    nombre: string,
    usuario: string,
    primer_apellido: string,
    segundo_apellido: string
    cedula: number
    contrasena?: string,
    telefonos: string[],
    correo: string,
    direcciones: string[]
}

export interface ClienteResponse {
    actualizado: boolean,
    mensaje: string,
}
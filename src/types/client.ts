export interface ClientCreateDataType {
  nombre: string;
  apellidos: string;
  identificacion: string;
  celular: string;
  telefonoCelular: string;
  otroTelefono: string;
  direccion: string;
  fNacimiento: string;
  fAfiliacion: string;
  sexo: string;
  resennaPersonal: string;
  resenaPersonal: string;
  imagen: string;
  interesFK: string;
  interesesId: string;
  usuarioId: string;
}

export interface ClientDetailDataType extends ClientCreateDataType {
  id?: string;
}

export interface ClientListDataType {
  id: string;
  identificacion: string;
  nombre: string;
  apellidos: string;
}

export interface ClientInteresses {
  id: string;
  descripcion: string;
}

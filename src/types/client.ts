export interface ClientCreateDataType {
  nombre: string;
  apellidos: string;
  identificacion: string;
  celular: string;
  otroTelefono: string;
  direccion: string;
  fNacimiento: string;
  fAfiliacion: string;
  sexo: string;
  resennaPersonal: string;
  imagen: string;
  interesFK: string;
  usuarioId: string;
}

export interface ClientDetailDataType extends ClientCreateDataType {
  id: string;
}

export interface ClientListDataType {
  id: string;
  identificacion: string;
  nombre: string;
  apellidos: string;
}

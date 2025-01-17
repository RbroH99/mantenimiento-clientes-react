import { AxiosError } from "axios";
import apiClient from "./api";
import {
  ClientCreateDataType,
  ClientDetailDataType,
  ClientListDataType,
  UserAuthDataType,
  UserInfoType,
  UserRegisterDataType,
} from "../types";

const handleAuthError = (
  message: string,
  err: any,
  throwError: boolean,
  onError?: (err: any) => void
) => {
  console.error(message, err);
  if (onError) onError(err);
  if (throwError) throw err;
};

export const login = async (
  data: UserAuthDataType,
  throwError: boolean = false,
  onError?: (err: any) => void
): Promise<UserInfoType | void> => {
  try {
    const res = await apiClient.post("api/Authenticate/login", data);

    if (res.status !== 200) {
      throw new AxiosError(
        `Inicio de sesión fallado. Código de estado: ${res.status}`,
        undefined,
        res.request,
        res.config
      );
    }

    return res.data;
  } catch (err) {
    handleAuthError(
      "Ocurrió un error tratando de iniciar sesión.",
      err,
      throwError,
      onError
    );
  }
};

export const register = async (
  data: UserRegisterDataType,
  throwError: boolean = false,
  onError?: (err: any) => void
) => {
  try {
    const res = await apiClient.post("api/Authenticate/register", data);

    if (res.status !== 200) {
      throw new AxiosError(
        `Error creando usuario. Código de estado: ${res.status}`,
        undefined,
        res.request,
        res.config,
        res.request || {}
      );
    }
  } catch (err) {
    handleAuthError(
      "Ocurrió un error tratando de registrar usuario.",
      err,
      throwError,
      onError
    );
  }
};

export function checkUserAuthenticated(): boolean {
  const token = localStorage.getItem("token");
  return !!token;
}

export const getClients = async (
  userId: string,
  nombre?: string,
  identificacion?: string
): Promise<ClientListDataType[]> => {
  const data: { userId: string; nombre?: string; identificacion?: string } = {
    userId: userId,
    nombre: nombre ?? undefined,
    identificacion: identificacion ?? undefined,
  };
  const res = await apiClient.post("api/Cliente/Listado", data);
  return res.data;
};

export const getClientDetails = async (
  id: string
): Promise<ClientDetailDataType> => {
  const res = await apiClient.get(`api/Cliente/Obtener/${id}`);
  return res.data;
};

export const createClient = async (data: ClientCreateDataType) => {
  await apiClient.post("api/Cliente/Crear", data);
};
export const updateClient = async (data: ClientDetailDataType) =>
  await apiClient.post("api/Cliente/Actualizar", data);

export const deleteClient = async (id: string) =>
  await apiClient.delete(`api/Cliente/Eliminar/${id}`);

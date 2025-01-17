import { ClientCreateDataType, ClientDetailDataType } from "../../types";

export const processFormData = (
  formData: ClientCreateDataType,
  userId: string,
  id?: string
): ClientDetailDataType | void => {
  try {
    const phoneNumber = formData.celular ?? formData.telefonoCelular;
    const rating = formData.resenaPersonal ?? formData.resennaPersonal;
    const interest = formData.interesFK ?? formData.interesesId;

    const newFormData: ClientDetailDataType = {
      ...formData,
      usuarioId: userId,
      telefonoCelular: phoneNumber,
      celular: phoneNumber,
      resenaPersonal: rating,
      resennaPersonal: rating,
      interesesId: interest,
      interesFK: interest,
      id: id,
    };
    return newFormData;
  } catch (error) {
    console.error("Error processing form data.", error);
  }
};

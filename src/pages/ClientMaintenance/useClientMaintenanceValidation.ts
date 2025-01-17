import { useState } from "react";
import { ClientCreateDataType } from "../../types";

const useClientMaintenanceValidation = (formData: ClientCreateDataType) => {
  const [errors, setErrors] = useState({
    identificacion: false,
    nombre: false,
    apellidos: false,
    sexo: false,
    fNacimiento: false,
    fAfiliacion: false,
    celular: false,
    otroTelefono: false,
    interesFK: false,
    direccion: false,
    resennaPersonal: false,
  });

  const validateForm = () => {
    const newErrors = {
      identificacion: formData.identificacion === "",
      nombre: formData.nombre === "",
      apellidos: formData.apellidos === "",
      sexo: formData.sexo === "",
      fNacimiento: formData.fNacimiento === "",
      fAfiliacion: formData.fAfiliacion === "",
      celular: formData.celular === "",
      otroTelefono: formData.otroTelefono === "",
      interesFK: formData.interesFK === "",
      direccion: formData.direccion === "",
      resennaPersonal: formData.resennaPersonal === "",
    };
    setErrors(newErrors);
    return !Object.values(newErrors).includes(true);
  };
  return {
    errors,
    setErrors,
    validateForm,
  };
};

export default useClientMaintenanceValidation;

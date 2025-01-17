import React, { Dispatch, SetStateAction, useState } from "react";
import { ClientCreateDataType } from "../../types";
import { SelectChangeEvent } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";

export interface MaintenanceChangeHandlersProps {
  formData: ClientCreateDataType;
  setFormData: Dispatch<SetStateAction<ClientCreateDataType>>;
}

const useClientMaintenanceChangeHandlers = ({
  formData,
  setFormData,
}: MaintenanceChangeHandlersProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleResetForm = () => {
    setFormData({
      identificacion: "",
      nombre: "",
      apellidos: "",
      sexo: "F",
      fNacimiento: dayjs().format("DD/MM/YYYY"),
      fAfiliacion: dayjs().format("DD/MM/YYYY"),
      celular: "",
      otroTelefono: "",
      interesFK: "",
      direccion: "",
      resennaPersonal: "",
      imagen: "",
      usuarioId: "",
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange =
    (field: keyof ClientCreateDataType) => (date: Dayjs | null) => {
      setFormData((prev) => ({
        ...prev,
        [field]: date,
      }));
    };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setFormData((prev) => ({
          ...prev,
          imagen: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return {
    imagePreview,
    handleResetForm,
    handleChange,
    handleDateChange,
    handleImageChange,
    handleSelectChange,
  };
};

export default useClientMaintenanceChangeHandlers;

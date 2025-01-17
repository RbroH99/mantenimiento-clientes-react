import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ClientCreateDataType } from "../../types";
import { SelectChangeEvent } from "@mui/material";
import { Dayjs } from "dayjs";

export interface MaintenanceChangeHandlersProps {
  formData: ClientCreateDataType;
  setFormData: Dispatch<SetStateAction<ClientCreateDataType>>;
}

const useClientMaintenanceChangeHandlers = ({
  formData,
  setFormData,
}: MaintenanceChangeHandlersProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case "celular":
        setFormData((prev) => ({
          ...prev,
          celular: value,
          telefonoCelular: value,
        }));
        break;
      case "resennaPersonal":
        setFormData((prev) => ({
          ...prev,
          resennaPersonal: value,
          resenaPersonal: value,
        }));
        break;
      case "interesFk":
        setFormData((prev) => ({
          ...prev,
          interesFK: value,
          interesesId: value,
        }));
        break;

      default:
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
        break;
    }
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

  useEffect(() => {
    if (formData.imagen) {
      setImagePreview(formData.imagen);
    }
  }, [formData.imagen]);

  return {
    imagePreview,
    handleChange,
    handleDateChange,
    handleImageChange,
    handleSelectChange,
  };
};

export default useClientMaintenanceChangeHandlers;

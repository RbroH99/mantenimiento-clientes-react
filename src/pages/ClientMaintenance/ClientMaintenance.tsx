import React, { useEffect, useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Button,
} from "@mui/material";
import { Save, ArrowBack, Person } from "@mui/icons-material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { ClientCreateDataType, ClientInteresses } from "../../types";
import { useNavigate } from "react-router-dom";
import useClientMaintenanceValidation from "./useClientMaintenanceValidation";
import useClientMaintenanceChangeHandlers from "./useClientMaintenanceChangeHandlers";
import { useAuthContext } from "../../context/AuthContext";
import { createClient, getInteresses } from "../../services/clientService";
import { useSiteNotificationContext } from "../../context/SiteNotificationContext";

const ClientMaintenance: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [interesses, setInteresses] = useState<ClientInteresses[]>([]);
  const [formData, setFormData] = useState<ClientCreateDataType>({
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
  const { errors, validateForm } = useClientMaintenanceValidation(formData);
  const {
    imagePreview,
    handleChange,
    handleDateChange,
    handleImageChange,
    handleSelectChange,
  } = useClientMaintenanceChangeHandlers({ formData, setFormData });
  const { user } = useAuthContext();
  //   const [userId, setUserId] = useState<string>();
  const { showNotification } = useSiteNotificationContext();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (validateForm()) {
      let processedData = {};
      if (user) {
        console.log("User:", user);
        processedData = {
          ...formData,
          fNacimiento: dayjs(formData.fNacimiento).format("YYYY-MM-DD"),
          fAfiliacion: dayjs(formData.fAfiliacion).format("YYYY-MM-DD"),
          usuarioId: user.userid,
        };
      }
      try {
        setLoading(true);
        console.log("Formulario válido:", formData);
        await createClient(processedData as ClientCreateDataType, true);
        navigate("/clients");
        showNotification("Cliente creado exitosamente.", "success");
      } catch (err) {
        showNotification(
          "Ocurrió un error tratando de crear el nuevo cliente.",
          "error"
        );
        console.error("An error occurring while creating client", err);
      } finally {
        setLoading(false);
      }
    } else {
      console.log("Formulario inválido");
    }
  };

  useEffect(() => {
    try {
      setLoading(true);
      getInteresses().then((res) => setInteresses(res));
    } catch (err) {
      showNotification("Error Obteniendo intereses", "error");
      console.error("Error fetching interesses", err);
    } finally {
      setLoading(false);
    }
  }, []);

  //   useEffect(() => {
  //     if (user) setUserId(user.userid);
  //   }, [user]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"es"}>
      <Box className="max-w-[1200px] mx-auto mt-0 p-6">
        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-lg shadow-sm">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <div className="flex items-center gap-4">
                <div className="image-input ml-6 flex items-center w-16 h-16 justify-center bg-gray-50 hover:bg-gray-200 border-4 border-gray-200 rounded-full relative">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <Person className="!w-12 !h-12 text-gray-600" />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
                <h1 className="text-[#34485c] text-3xl font-bold">
                  Mantenimiento de clientes
                </h1>
              </div>
              <div className="flex gap-3">
                <Button
                  loading={loading}
                  variant="contained"
                  type="submit"
                  className="flex items-center gap-2 px-4 py-2 !shadow-none !bg-gray-100 !text-gray-500 !font-bold !rounded hover:!bg-gray-200"
                >
                  <Save className="text-gray-600" />
                  <span>Guardar</span>
                </Button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/clients");
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-500 font-bold rounded hover:bg-gray-200"
                >
                  <ArrowBack className="text-gray-600" />
                  <span>Regresar</span>
                </button>
              </div>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <TextField
                required
                fullWidth
                label="Identificación"
                name="identificacion"
                value={formData.identificacion}
                onChange={handleChange}
                variant="outlined"
                error={errors.identificacion}
              />
              <TextField
                required
                fullWidth
                label="Nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                variant="outlined"
                error={errors.nombre}
              />
              <TextField
                required
                fullWidth
                label="Apellidos"
                name="apellidos"
                value={formData.apellidos}
                onChange={handleChange}
                variant="outlined"
                error={errors.apellidos}
              />

              <FormControl fullWidth required>
                <InputLabel>Género </InputLabel>
                <Select
                  value={formData.sexo}
                  name="sexo"
                  label="Género "
                  onChange={handleSelectChange}
                  error={errors.sexo}
                >
                  <MenuItem value="F">Femenino</MenuItem>
                  <MenuItem value="M">Masculino</MenuItem>
                </Select>
                {errors.sexo && <p className="text-red-600">Campo requerido</p>}
              </FormControl>

              <FormControl required error={errors.fNacimiento}>
                <DatePicker
                  name="fNacimiento"
                  label="Fecha de nacimiento *"
                  value={dayjs(formData.fNacimiento, "DD/MM/YYYY")}
                  onChange={handleDateChange("fNacimiento")}
                />
                {errors.fNacimiento && (
                  <p className="text-red-600">Campo requerido</p>
                )}
              </FormControl>

              <FormControl required error={errors.fAfiliacion}>
                <DatePicker
                  name="fAfiliacion"
                  label="Fecha de afiliación *"
                  value={dayjs(formData.fAfiliacion, "DD/MM/YYYY")}
                  onChange={handleDateChange("fAfiliacion")}
                />
                {errors.fAfiliacion && (
                  <p className="text-red-600">Campo requerido</p>
                )}
              </FormControl>

              <TextField
                required
                fullWidth
                label="Teléfono Celular"
                name="celular"
                value={formData.celular}
                onChange={handleChange}
                variant="outlined"
                error={errors.celular}
                helperText={errors.otroTelefono ? "Campo requerido" : ""}
              />

              <TextField
                required
                fullWidth
                label="Teléfono Otro"
                name="otroTelefono"
                value={formData.otroTelefono}
                onChange={handleChange}
                variant="outlined"
                error={errors.otroTelefono}
              />

              <FormControl fullWidth required error={errors.interesFK}>
                <InputLabel>Interes</InputLabel>
                <Select
                  value={formData.interesFK}
                  name="interesFK"
                  label="Interes *"
                  onChange={handleSelectChange}
                >
                  {interesses.map((interest) => (
                    <MenuItem key={interest.id} value={interest.id}>
                      {interest.description}
                    </MenuItem>
                  ))}
                </Select>
                {errors.interesFK && (
                  <p className="text-red-600">Campo requerido</p>
                )}
              </FormControl>

              <TextField
                required
                fullWidth
                label="Dirección"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                variant="outlined"
                className="col-span-full"
                error={errors.direccion}
                helperText={errors.direccion ? "Campo requerido" : ""}
              />

              <TextField
                required
                fullWidth
                label="Reseña"
                name="resennaPersonal"
                value={formData.resennaPersonal}
                onChange={handleChange}
                variant="outlined"
                multiline
                rows={1}
                className="col-span-full"
                error={errors.resennaPersonal}
                helperText={errors.resennaPersonal ? "Campo requerido" : ""}
              />
            </div>
          </div>
        </form>
      </Box>
    </LocalizationProvider>
  );
};

export default ClientMaintenance;

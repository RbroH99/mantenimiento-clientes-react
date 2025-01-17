import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
} from "@mui/material";
import { Add, ArrowBack, Edit, Delete } from "@mui/icons-material";
import { ClientListDataType } from "../../types";
import ClientFilterForm from "../../components/ClientFilterForm/ClientFilterForm";
import { useAuthContext } from "../../context/AuthContext";
import { useSiteNotificationContext } from "../../context/SiteNotificationContext";
import { getClients } from "../../services/clientService";

const ClientsConsultation: React.FC = () => {
  const [clients, setClients] = useState<ClientListDataType[]>([]);
  const { user } = useAuthContext();
  const { showNotification } = useSiteNotificationContext();

  const fetchClients = async (name?: string, identification?: string) => {
    try {
      let newClients: ClientListDataType[] = [];
      if (user)
        newClients = await getClients(user.userId, name, identification);
      if (!!newClients) setClients(newClients);
    } catch (err) {
      console.error("There was an error while fetching clients:", err);
      showNotification("Ocurrió un error obteniendo los clientes.", "error");
    }
  };

  const handleSearch = async (name: string, identification: string) => {
    fetchClients(name, identification);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <Box className="p-6 max-w-[1200px] bg-white shadow-md !border-1 !border-gray-500 rounded-md min-h-[screen-10] mx-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[24px] text-[#2C3E50] font-normal">
          Consulta de clientes
        </h1>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded hover:bg-gray-200">
            <Add className="text-gray-600" />
            <span>Agregar</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded hover:bg-gray-200">
            <ArrowBack className="text-gray-600" />
            <span>Regresar</span>
          </button>
        </div>
      </div>

      <ClientFilterForm onSearch={handleSearch} />

      <TableContainer component={Paper} className="shadow-none border rounded">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                className="bg-[#2196f3] text-white font-normal"
                style={{ borderBottom: "none" }}
              >
                Identificación
              </TableCell>
              <TableCell
                className="bg-[#2196f3] text-white font-normal"
                style={{ borderBottom: "none" }}
              >
                Nombre completo
              </TableCell>
              <TableCell
                className="bg-[#2196f3] text-white font-normal"
                align="right"
                style={{ borderBottom: "none" }}
              >
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id} className="hover:bg-gray-50">
                <TableCell className="text-gray-600 border-b border-gray-200">
                  {client.id}
                </TableCell>
                <TableCell className="text-gray-600 border-b border-gray-200">
                  {`${client.nombre} ${client.apellidos}`}
                </TableCell>
                <TableCell align="right" className="border-b border-gray-200">
                  <IconButton size="small">
                    <Edit fontSize="small" className="text-gray-400" />
                  </IconButton>
                  <IconButton size="small">
                    <Delete fontSize="small" className="text-gray-400" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ClientsConsultation;

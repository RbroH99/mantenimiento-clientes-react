import { IconButton, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";
import React, { useState } from "react";

export interface ClientFilterForm {
  onSearch: (name: string, identification: string) => void;
}

const ClientFilterForm: React.FC<ClientFilterForm> = ({ onSearch }) => {
  const [searchName, setSearchName] = useState("");
  const [searchIdentification, setSearchIdentification] = useState("");

  const handleSearchClick = () => {
    onSearch(searchName, searchIdentification);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <TextField
        fullWidth
        placeholder="Nombre"
        variant="outlined"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
        className="bg-white border-2"
      />
      <div className="flex flex-row gap-3">
        <TextField
          fullWidth
          placeholder="Identificación"
          variant="outlined"
          value={searchIdentification}
          onChange={(e) => setSearchIdentification(e.target.value)}
          className="bg-white"
        />
        <IconButton
          className="!bg-gray-200 border-2 w-14 h-14"
          onClick={handleSearchClick}
        >
          <Search className="text-gray-500 !w-8 !h-8" />
        </IconButton>
      </div>
    </div>
  );
};

export default ClientFilterForm;

import React from "react";
import { Box, Typography } from "@mui/material";
import { RegisterFormProvider } from "../../context/RegisterFormContext";
import UserRegisterForm from "../../components/UserRegisterForm/UserRegisterForm";

const Register: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Box component="div" className="max-w-md w-full space-y-6 p-8">
        <Typography
          variant="h5"
          component="h1"
          className="text-center text-gray-700 mb-6"
        >
          Registro
        </Typography>
        <RegisterFormProvider>
          <UserRegisterForm />
        </RegisterFormProvider>
      </Box>
    </div>
  );
};

export default Register;

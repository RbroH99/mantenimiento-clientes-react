import React from "react";
import { LoginFormProvider } from "../../context/LoginFormContext";
import UserAuthForm from "../../components/UserAuthForm/UserAuthForm";

const Login: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-6 p-8">
        <h2 className="text-center text-xl font-medium text-gray-700">
          Iniciar Sesión
        </h2>
        <LoginFormProvider>
          <UserAuthForm />
        </LoginFormProvider>
      </div>
    </div>
  );
};

export default Login;

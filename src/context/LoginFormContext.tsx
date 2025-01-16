import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { UserAuthFormData } from "../types";
import { AuthContextType, useAuthContext } from "./AuthContext";
import { Alert, Snackbar } from "@mui/material";

export interface LoginFormContextType
  extends Omit<AuthContextType, "register" | "logout" | "login"> {
  formData: UserAuthFormData;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent) => void;
}

export const LoginFormContext = createContext<LoginFormContextType | undefined>(
  undefined
);

export const useLoginFormContext = () => {
  const context = useContext(LoginFormContext);
  if (!context) {
    throw new Error(
      "useAuthFormContext must be used within an AuthFormProvider"
    );
  }
  return context;
};

export const LoginFormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<UserAuthFormData>({
    username: "",
    password: "",
    remember: false,
  });
  const { error, loading, login, token, user } = useAuthContext();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [loginMessage, setLoginMessage] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "remember" ? checked : value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await login(formData.username, formData.password).then(() => {
      if (user) {
        if (formData.remember)
          localStorage.setItem("user", JSON.stringify(user));
        setLoginMessage("Sesión iniciada correctamente.");
      } else {
        setLoginMessage(error);
      }
    });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    if (error) setLoginMessage(error);
  }, [error]);

  useEffect(() => {
    if (loginMessage) setSnackbarOpen(true);
  }, [loginMessage]);

  return (
    <LoginFormContext.Provider
      value={{
        formData,
        handleChange,
        handleSubmit,
        error,
        loading,
        token,
        user,
      }}
    >
      {children}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={user ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {loginMessage || "Oops ...Error autenticándose!"}
        </Alert>
      </Snackbar>
    </LoginFormContext.Provider>
  );
};

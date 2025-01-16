import {
  createContext,
  useState,
  ReactNode,
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
} from "react";
import { UserRegisterDataType } from "../types";
import { useAuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { useSiteNotificationContext } from "./SiteNotificationContext";

interface RegisterFormContextType {
  formData: { username: string; email: string; password: string };
  errors: { username: string; email: string; password: string };
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const RegisterFormContext = createContext<RegisterFormContextType | undefined>(
  undefined
);

export const useRegisterFormContext = () => {
  const context = useContext(RegisterFormContext);
  if (!context) {
    throw new Error(
      "useRegisterFormContext must be used within a RegisterFormProvider"
    );
  }
  return context;
};

export const RegisterFormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<UserRegisterDataType>({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<UserRegisterDataType>({
    username: "",
    email: "",
    password: "",
  });
  const { register, error } = useAuthContext();
  const navigate = useNavigate();
  const { showNotification } = useSiteNotificationContext();

  const validatePassword = (password: string) => {
    let errorMessage = "";
    if (password.length < 8 || password.length > 20) {
      errorMessage += "Debe contener al menos 8 y no más de 20 caracteres. ";
    }
    if (!/[A-Z]/.test(password)) {
      errorMessage += "Debe contener al menos una mayúscula. ";
    }
    if (!/[a-z]/.test(password)) {
      errorMessage += "Debe contener al menos una minúscula. ";
    }
    if (!/\d/.test(password)) {
      errorMessage += "Debe contener al menos un número. ";
    }
    return errorMessage.trim();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    let errorMessage = "";
    if (name === "password") {
      errorMessage = validatePassword(value);
    } else if (name === "email") {
      errorMessage = !/\S+@\S+\.\S+/.test(value)
        ? "El correo electrónico no es válido. Ej: youremail@example.com"
        : "";
    } else if (name === "username") {
      errorMessage =
        value.trim() === "" ? "El nombre de usuario es requerido" : "";
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const res = await register(formData);
    if (res) {
      showNotification(res, "success");
      navigate("/");
    } else if (error) showNotification(error, "error");
  };

  useEffect(() => {
    if (error) showNotification(error, "error");
  }, [error]);

  return (
    <RegisterFormContext.Provider
      value={{ formData, errors, handleChange, handleSubmit }}
    >
      {children}
    </RegisterFormContext.Provider>
  );
};

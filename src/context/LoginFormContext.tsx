import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { UserAuthFormData } from "../types";
import { AuthContextType, useAuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { useSiteNotificationContext } from "./SiteNotificationContext";

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
  const navigate = useNavigate();
  const { showNotification } = useSiteNotificationContext();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "remember" ? checked : value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await login(formData.username, formData.password, formData.remember).then(
      () => {
        if (localStorage.getItem("token")) {
          showNotification("Sesión iniciada correctamente.", "success");
          navigate("/");
        } else if (error) {
          showNotification(error, "error");
        }
      }
    );
  };

  useEffect(() => {
    if (error) showNotification(error, "error");
  }, [error]);

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
    </LoginFormContext.Provider>
  );
};

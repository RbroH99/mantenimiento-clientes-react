import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import {
  login as loginService,
  register as registerService,
} from "../services/clientService";
import { UserInfoType, UserRegisterDataType } from "../types";
import { AxiosError } from "axios";

export interface AuthContextType {
  user: UserInfoType | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (
    data: UserRegisterDataType,
    onError?: (err: AxiosError) => void
  ) => Promise<string | void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserInfoType | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (username: string, password: string) => {
    try {
      setLoading(true);
      const userInfo = await loginService({ username, password }, true);
      if (userInfo) {
        setToken(userInfo.token);
        setUser(userInfo);
        localStorage.setItem("token", userInfo.token);
      }
    } catch (err) {
      setError(
        "Error al iniciar sesión. Por favor, verifique sus credenciales."
      );
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    data: UserRegisterDataType,
    onError?: (err: AxiosError) => void
  ) => {
    try {
      setLoading(true);
      await registerService(data, true);
      return "Usuario creado correctamente. Por favor, inicia sesión.";
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data.message || "Error creando usuario");
        if (onError) onError(err);
      } else setError("Error al registrarse. Por favor, inténtelo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

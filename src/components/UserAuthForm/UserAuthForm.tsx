import {
  TextField,
  Checkbox,
  Button,
  FormControlLabel,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { useLoginFormContext } from "../../context/LoginFormContext";

const UserAuthForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { loading, formData, handleChange, handleSubmit } =
    useLoginFormContext();

  return (
    <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
      <TextField
        fullWidth
        required
        label="Usuario"
        name="username"
        value={formData.username}
        onChange={handleChange}
        variant="outlined"
      />

      <TextField
        fullWidth
        required
        label="Contraseña"
        name="password"
        type={showPassword ? "text" : "password"}
        value={formData.password}
        onChange={handleChange}
        variant="outlined"
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />

      <FormControlLabel
        control={
          <Checkbox
            name="remember"
            checked={formData.remember}
            onChange={handleChange}
            color="primary"
          />
        }
        label="Recuérdame"
      />

      <Button
        loading={loading}
        type="submit"
        fullWidth
        variant="contained"
        className="bg-blue-400 hover:bg-blue-600 py-3 text-white font-medium"
      >
        INICIAR SESIÓN
      </Button>

      <div className="text-center mt-4">
        <span className="text-gray-600">¿No tiene una cuenta? </span>
        <a href="/register" className="text-blue-400 hover:text-blue-600">
          Regístrese
        </a>
      </div>
    </form>
  );
};

export default UserAuthForm;

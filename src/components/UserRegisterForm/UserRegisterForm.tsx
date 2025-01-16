import { TextField, Button, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { useRegisterFormContext } from "../../context/RegisterFormContext";
import { useAuthContext } from "../../context/AuthContext";

const UserRegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { formData, errors, handleChange, handleSubmit } =
    useRegisterFormContext();
  const { loading } = useAuthContext();

  return (
    <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
      <TextField
        fullWidth
        required
        label="Nombre de usuario"
        name="username"
        value={formData.username}
        onChange={handleChange}
        error={!!errors.username}
        helperText={errors.username}
        variant="outlined"
      />

      <TextField
        fullWidth
        required
        label="Dirección de correo"
        name="email"
        placeholder="email@example.com"
        value={formData.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email}
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
        error={!!errors.password}
        helperText={errors.password}
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

      <Button
        type="submit"
        loading={loading}
        fullWidth
        variant="contained"
        className="bg-blue-500 hover:bg-blue-600 py-3 text-white font-medium"
      >
        REGISTRARME
      </Button>
    </form>
  );
};

export default UserRegisterForm;

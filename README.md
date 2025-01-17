# Mantenimiento Clientes React

Aplicación de gestión de clientes; una SPA implementada usando React, Typescript y MaterialUI.

## Tecnologías y versiones utilizadas

- React: ^17.0.2
- Typescript: ^4.4.4
- Material-UI: ^6.4.0
- Axios: ^1.7.9
- Dayjs: ^1.11.13
- TailwindCSS: ^3.4.4
- React Router DOM: ^6.28.1

## Instrucciones para clonar el proyecto

1. Clona el repositorio:

   ```sh
   git clone https://github.com/tu-usuario/mantenimiento-clientes-react.git
   ```

2. Navega al directorio del proyecto:

   ```sh
   cd mantenimiento-clientes-react
   ```

3. Instala las dependencias:

   ```sh
   npm install
   ```

4. Inicia la aplicación:

   ```sh
   npm start
   ```

## Ejemplos de uso

### AuthContext

El AuthContext se utiliza para manejar la autenticación de usuarios. Aquí tienes un ejemplo de cómo usarlo:

```ts
import React, { useContext } from "react";
import { AuthContext, useAuthContext } from "../context/AuthContext";

const LoginComponent = () => {
  const { login, user, logout } = useAuthContext();

  const handleLogin = async () => {
    await login("username", "password", true);
  };

  return (
    <div>
      {user ? (
        <div>
          <p>Bienvenido, {user.username}</p>
          <button onClick={logout}>Cerrar sesión</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Iniciar sesión</button>
      )}
    </div>
  );
};

export default LoginComponent;
```

### SiteNotificationContext

El SiteNotificationContext se utiliza para mostrar notificaciones en la aplicación. Aquí tienes un ejemplo de cómo usarlo:

```ts
import React from "react";
import { useSiteNotificationContext } from "../context/SiteNotificationContext";

const NotificationComponent = () => {
  const { showNotification } = useSiteNotificationContext();

  const handleClick = () => {
    showNotification("Esta es una notificación de éxito", "success");
  };

  return <button onClick={handleClick}>Mostrar notificación</button>;
};

export default NotificationComponent;
```

### ConfirmationDialog

El ConfirmationDialog se utiliza para mostrar un cuadro de diálogo de confirmación. Aquí tienes un ejemplo de cómo usarlo:

#### Componente ConfirmationDialog

```ts
import React, { useState } from "react";
import { ConfirmationDialog } from "../components/ConfirmationDialog/ConfirmationDialog";

const ConfirmationDialogComponent = () => {
  const [open, setOpen] = useState(false);

  const handleClose = (confirmed: boolean) => {
    if (confirmed) {
      console.log("Acción confirmada");
    } else {
      console.log("Acción cancelada");
    }
    setOpen(false);
  };

  return (
    <div>
      <button onClick={() => setOpen(true)}>
        Mostrar diálogo de confirmación
      </button>
      <ConfirmationDialog
        open={open}
        title="Confirmar acción"
        contentText="¿Estás seguro de que deseas continuar?"
        cancelText="Cancelar"
        okText="Aceptar"
        onClose={handleClose}
      />
    </div>
  );
};

export default ConfirmationDialogComponent;
```

#### Función showConfirmationDialog

```ts
import React from "react";
import { showConfirmationDialog } from "../components/ConfirmationDialog/ConfirmationDialog";

const ShowConfirmationDialogComponent = () => {
  const handleClick = async () => {
    const confirmed = await showConfirmationDialog(
      "Confirmar acción",
      "¿Estás seguro de que deseas continuar?",
      "Cancelar",
      "Aceptar"
    );
    if (confirmed) {
      console.log("Acción confirmada");
    } else {
      console.log("Acción cancelada");
    }
  };

  return <button onClick={handleClick}>Mostrar diálogo de confirmación</button>;
};

export default ShowConfirmationDialogComponent;
```

# Client Management React

Client management application; a SPA implemented using React, Typescript, and MaterialUI.

## Technologies and Versions Used

- React: ^17.0.2
- Typescript: ^4.4.4
- Material-UI: ^6.4.0
- Axios: ^1.7.9
- Dayjs: ^1.11.13
- TailwindCSS: ^3.4.4
- React Router DOM: ^6.28.1

## Instructions to Clone the Project

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/client-management-react.git
   ```

2. Navigate to the project directory:

   ```sh
   cd client-management-react
   ```

3. Install the dependencies:

   ```sh
   npm install
   ```

4. Start the application:

   ```sh
   npm start
   ```

## Usage Examples

### AuthContext

The AuthContext is used to handle user authentication. Here is an example of how to use it:

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
          <p>Welcome, {user.username}</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
};

export default LoginComponent;
```

### SiteNotificationContext

The SiteNotificationContext is used to display notifications in the application. Here is an example of how to use it:

```ts
import React from "react";
import { useSiteNotificationContext } from "../context/SiteNotificationContext";

const NotificationComponent = () => {
  const { showNotification } = useSiteNotificationContext();

  const handleClick = () => {
    showNotification("This is a success notification", "success");
  };

  return <button onClick={handleClick}>Show Notification</button>;
};

export default NotificationComponent;
```

### ConfirmationDialog

The ConfirmationDialog is used to display a confirmation dialog. Here is an example of how to use it:

#### ConfirmationDialog Component

```ts
import React, { useState } from "react";
import { ConfirmationDialog } from "../components/ConfirmationDialog/ConfirmationDialog";

const ConfirmationDialogComponent = () => {
  const [open, setOpen] = useState(false);

  const handleClose = (confirmed: boolean) => {
    if (confirmed) {
      console.log("Action confirmed");
    } else {
      console.log("Action canceled");
    }
    setOpen(false);
  };

  return (
    <div>
      <button onClick={() => setOpen(true)}>Show Confirmation Dialog</button>
      <ConfirmationDialog
        open={open}
        title="Confirm Action"
        contentText="Are you sure you want to proceed?"
        cancelText="Cancel"
        okText="Accept"
        onClose={handleClose}
      />
    </div>
  );
};

export default ConfirmationDialogComponent;
```

#### showConfirmationDialog Function

```ts
import React from "react";
import { showConfirmationDialog } from "../components/ConfirmationDialog/ConfirmationDialog";

const ShowConfirmationDialogComponent = () => {
  const handleClick = async () => {
    const confirmed = await showConfirmationDialog(
      "Confirm Action",
      "Are you sure you want to proceed?",
      "Cancel",
      "Accept"
    );
    if (confirmed) {
      console.log("Action confirmed");
    } else {
      console.log("Action canceled");
    }
  };

  return <button onClick={handleClick}>Show Confirmation Dialog</button>;
};

export default ShowConfirmationDialogComponent;
```

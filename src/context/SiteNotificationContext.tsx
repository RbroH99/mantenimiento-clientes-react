import { createContext, useState, ReactNode, useContext } from "react";
import { Snackbar, Alert, Grow } from "@mui/material";

interface Notification {
  message: string;
  severity: "success" | "info" | "warning" | "error";
}

interface SiteNotificationContextType {
  notification: Notification | null;
  showNotification: (
    message: string,
    severity: Notification["severity"]
  ) => void;
  hideNotification: () => void;
}

const SiteNotificationContext = createContext<
  SiteNotificationContextType | undefined
>(undefined);

export const useSiteNotificationContext = () => {
  const context = useContext(SiteNotificationContext);
  if (!context) {
    throw new Error(
      "useSiteNotificationContext must be used within a SiteNotificationProvider"
    );
  }
  return context;
};

export const SiteNotificationProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [notification, setNotification] = useState<Notification | null>(null);

  const showNotification = (
    message: string,
    severity: Notification["severity"]
  ) => {
    setNotification({ message, severity });
  };

  const hideNotification = () => {
    setNotification(null);
  };

  return (
    <SiteNotificationContext.Provider
      value={{ notification, showNotification, hideNotification }}
    >
      {children}
      <Snackbar
        open={!!notification}
        autoHideDuration={6000}
        onClose={hideNotification}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        TransitionComponent={(props) => <Grow {...props} />}
      >
        {
          <Alert
            onClose={hideNotification}
            severity={notification?.severity}
            sx={{ width: "100%" }}
          >
            {notification?.message || ""}
          </Alert>
        }
      </Snackbar>
    </SiteNotificationContext.Provider>
  );
};

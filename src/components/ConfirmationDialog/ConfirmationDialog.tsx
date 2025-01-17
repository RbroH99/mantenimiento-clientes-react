import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import ReactDOM from "react-dom";

interface ConfirmationDialogProps {
  open: boolean;
  title: string;
  contentText: string;
  cancelText?: string;
  okText?: string;
  onClose: (confirmed: boolean) => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  title,
  contentText,
  cancelText = "Cancelar",
  okText = "Aceptar",
  onClose,
}) => {
  const [internalOpen, setInternalOpen] = useState<boolean>(open);

  const handleClose = (confirmed: boolean) => {
    setInternalOpen(false);
    onClose(confirmed);
  };

  useEffect(() => {
    setInternalOpen(open);
  }, [open]);

  return (
    <Dialog open={internalOpen} onClose={() => handleClose(false)}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{contentText}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(false)}>{cancelText}</Button>
        <Button onClick={() => handleClose(true)} color="primary">
          {okText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const showConfirmationDialog = (
  title: string,
  contentText: string,
  cancelText?: string,
  okText?: string
): Promise<boolean> => {
  return new Promise((resolve) => {
    const div = document.createElement("div");
    document.body.appendChild(div);

    const handleClose = (confirmed: boolean) => {
      resolve(confirmed);
      ReactDOM.unmountComponentAtNode(div);
      document.body.removeChild(div);
    };

    ReactDOM.render(
      <ConfirmationDialog
        open={true}
        title={title}
        contentText={contentText}
        cancelText={cancelText}
        okText={okText}
        onClose={handleClose}
      />,
      div
    );
  });
};

export { ConfirmationDialog, showConfirmationDialog };

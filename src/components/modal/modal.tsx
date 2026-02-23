import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Button,
  styled,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface ModalAlertProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const ModalAlert: React.FC<ModalAlertProps> = ({
  open,
  onClose,
  title = "Informasi",
  message = "",
  confirmText = "OK",
}) => {
  return (
    <BootstrapDialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      BackdropProps={{
        sx: {
          backgroundColor: "rgba(111, 111, 111, 0.1)", // background transparan
        },
      }}
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: "none",
          width: 300
        },
      }}
    >
      <DialogTitle
        sx={{ m: 0, p: 2, fontWeight: "bold" }}
        id="customized-dialog-title"
      >
        {title}
      </DialogTitle>

      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent dividers>
        <Typography gutterBottom sx={{ textAlign: "center" }}>
          {message}
        </Typography>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center" }}>
        <Button
          variant="contained"
          onClick={onClose}
          sx={{
            backgroundColor: "#0049AC",
            "&:hover": { backgroundColor: "#003B8A" },
          }}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default ModalAlert;


import React from "react";
import { Snackbar } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';

/* success info warning error */

const ToastMessage = ({
  open,
  severity,
  message,
  seconds,
  handleClose
}) => {
  const handleCloseButton = () => {
    handleClose();
  };
  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={open}
        autoHideDuration={seconds}
        onClose={handleCloseButton}
      >
        <Alert elevation={6} variant="filled" onClose={handleCloseButton} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  )
};

export default ToastMessage;



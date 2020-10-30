import React from "react";
import { Snackbar } from "@material-ui/core";
/* import Alert  from '@material-ui/core/Alert'; */

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
        {/* <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={open}
          autoHideDuration={seconds}
          onClose={handleCloseButton}
        >
          <Alert  elevation={6} variant="filled" onClose={handleCloseButton} severity={severity}>
            {message}
          </Alert>
        </Snackbar> */}
        Hi
      </div>
  ) 
};

export default ToastMessage;



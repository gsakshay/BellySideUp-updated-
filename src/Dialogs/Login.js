import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import { axiosPost } from '../config/axiosClient';
import { Context } from "../Context/ContextProvier"

const Login = ({ open, setOpen }) => {

  const handleClose = () => {
    setOpen(false);
    setUsername("")
    setPassword("")
  };

  const useStyles = makeStyles({
    register: {
      marginLeft: "15rem"
    }
  })

  const classes = useStyles()

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const context = useContext(Context)
  const user = context.Profile;
  const toast = context.Toast;

  const login = () => {
    axiosPost(`users/signin`, {
      username,
      password
    })
      .then(res => {
        if (res.status === 200) {
          toast.dispatch({
            type: "new-toast",
            value: {
              open: true,
              severity: "success",
              message: `Login successfull, Welcome ${res.data.user.username}`,
              seconds: 3000,
            }
          })
          window.location.reload()
          handleClose()
          user.dispatch({
            type: "all",
            value: res.data.user
          })
          setUsername("")
          setPassword("")
          localStorage.setItem("auth_token", res.data.token)
          localStorage.setItem("admin", res.data.user.admin)
        }
      }).catch(err => toast.dispatch({
        type: "new-toast",
        value: {
          open: true,
          severity: "error",
          message: `Please try again with valid credentials or reegister if you are a new user`,
          seconds: 3000,
        }
      }))
  }

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Login</DialogTitle>
      <DialogContent>
        <DialogContentText color="secondary">
          Please enter username and password to login
          </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          value={username}
          id="username"
          label="Username"
          onChange={(event) => setUsername(event.target.value)}
          type="email"
          fullWidth
        />
        <TextField
          margin="dense"
          id="password"
          label="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
          </Button>
        <Button onClick={login} color="primary">
          Login
          </Button>
      </DialogActions>
      <DialogContent >

      </DialogContent>
    </Dialog>
  );
}

export default Login;
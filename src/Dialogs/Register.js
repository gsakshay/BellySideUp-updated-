import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { axiosPost } from '../config/axiosClient';

  const useStyles = makeStyles({
  })

const Register = ({open, setOpen}) => {

  const handleClose = () => {
    setOpen(false);
    setUsername("")
    setFirstname("")
    setLastname("")
    setPhno("");
    setAddress("")
    setPassword("")
    setConfirmPassword("")
  };

  const classes = useStyles()

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [phno, setPhno] = useState("");
  const [address, setAddress] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("")

  const Register = () =>{
      if(password === confirmPassword){
        axiosPost(`users/register`, {
            firstName,
            lastName,
            username,
            password,
            phno,address
      })
      .then(res=>{
          if(res.status === 200){
              alert("User registered successfully")
              handleClose()
              setUsername("")
              setFirstname("")
              setLastname("")
              setPhno("");
              setAddress("")
              setPassword("")
              setConfirmPassword("")
          }
      })
      }else{
          alert("Passwords dont match")
      }
  }

  return (
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Register</DialogTitle>
        <DialogContent>
          <DialogContentText color="secondary">
            Please enter the details to register yourself
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            value={firstName}
            id="firstname"
            label="Firstname"
            onChange={(event)=>setFirstname(event.target.value)}
            type="name"
            fullWidth
          />
          <TextField
            margin="dense"
            value={lastName}
            id="lastname"
            label="Lastname"
            onChange={(event)=>setLastname(event.target.value)}
            type="name"
            fullWidth
          />
          <TextField
            margin="dense"
            value={phno}
            id="phno"
            label="Phone number"
            onChange={(event)=>setPhno(event.target.value)}
            type="name"
            fullWidth
          />
          <TextField
            margin="dense"
            value={address}
            id="address"
            label="Address"
            onChange={(event)=>setAddress(event.target.value)}
            multiline={true}
            rows="3"
            type="name"
            fullWidth
          />
          <TextField
            margin="dense"
            value={username}
            id="username"
            label="Username"
            onChange={(event)=>setUsername(event.target.value)}
            type="email"
            fullWidth
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            value={password}
            onChange={(event)=>setPassword(event.target.value)}
            type="password"
            fullWidth
          />
          <TextField
            margin="dense"
            id="confirm-password"
            label="Confirm Password"
            value={confirmPassword}
            onChange={(event)=>setConfirmPassword(event.target.value)}
            type="password"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={Register} color="primary">
            Register
          </Button>
        </DialogActions>
        <DialogContent >
        </DialogContent>
                  
      </Dialog>
  );
}

export default Register;
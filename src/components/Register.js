import React, { useContext, useState, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { axiosPost } from '../config/axiosClient';
import { Context } from '../Context/ContextProvier';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
})

const Register = () => {
    const classes = useStyles()
    const history = useHistory()

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstname] = useState("");
    const [lastName, setLastname] = useState("");
    const [phno, setPhno] = useState("");
    const [address, setAddress] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")

    const context = useContext(Context)
    const toast = context.Toast;

    const Register = () => {
        if (password === confirmPassword) {
            axiosPost(`users/register`, {
                firstName,
                lastName,
                username,
                password,
                phno, address
            })
                .then(res => {
                    if (res.status === 200) {
                        toast.dispatch({
                            type: "new-toast",
                            value: {
                                open: true,
                                severity: "success",
                                message: "User registered successfully, please login to continue",
                                seconds: 3000,
                            }
                        })
                        history.push("/")
                        setUsername("")
                        setFirstname("")
                        setLastname("")
                        setPhno("");
                        setAddress("")
                        setPassword("")
                        setConfirmPassword("")
                    }
                })
        } else {
            toast.dispatch({
                type: "new-toast",
                value: {
                    open: true,
                    severity: "warning",
                    message: "Passwords should match",
                    seconds: 3000,
                }
            })
        }
    }

    return (
        <div className="register-page">
            <Typography variant="h4" component="h4" color="secondary">
                Register yourself!!
            </Typography>
            <Typography variant="p" component="p" color="primary">
                Please enter the details to register yourself
            </Typography>

            <Container maxWidth="sm">


                <div className="padding-2">
                    <TextField
                        autoFocus
                        margin="dense"
                        value={firstName}
                        id="firstname"
                        label="First Name"
                        onChange={(event) => setFirstname(event.target.value)}
                        type="name"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        value={lastName}
                        id="lastname"
                        label="Last Name"
                        onChange={(event) => setLastname(event.target.value)}
                        type="name"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        value={phno}
                        id="phno"
                        label="Phone number"
                        onChange={(event) => setPhno(event.target.value)}
                        type="name"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        value={address}
                        id="address"
                        label="Address"
                        onChange={(event) => setAddress(event.target.value)}
                        multiline={true}
                        rows="5"
                        type="name"
                        fullWidth
                    />
                </div>


                <Typography variant="p" component="p" color="secondary">
                    Set username and password
                </Typography>

                <div className="padding-2">
                    <TextField
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
                    <TextField
                        margin="dense"
                        id="confirm-password"
                        label="Confirm Password"
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        type="password"
                        fullWidth
                    />
                </div>

                <div className="padding-2">
                    <Button onClick={() => history.push("/")} color="secondary">
                        Go back
                    </Button>
                    <Button onClick={Register} color="primary">
                        Register
                    </Button>
                </div>
            </Container>
        </div>
    );
}

export default Register;
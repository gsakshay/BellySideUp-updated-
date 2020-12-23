import React, { useState, useEffect, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import { axiosGet, axiosPost } from "../../config/axiosClient"
import { makeStyles } from '@material-ui/core/styles';
import Card from "../../components/Card";
import TextField from '@material-ui/core/TextField';
import { Context } from "../../Context/ContextProvier";
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    promotions: {
        [theme.breakpoints.up('md')]: {
            padding: "4rem"
        },
    },
    description: {
        [theme.breakpoints.up('md')]: {
            padding: "2rem 10rem"
        },
        color: "rgb(255, 56, 92)",
        backgroundColor: "#fcdada"
    },
    feedback: {
        [theme.breakpoints.up('md')]: {
            width: "100%"
        },
    },
    actionButtons: {
        margin: "2rem"
    },
    feedbackContnet: {
        padding: "2rem"
    },
}));

const Contact = () => {
    const classes = useStyles();

    const [userFeedback, setUseerFeedback] = useState("")

    const context = useContext(Context)
    const { username } = context.Profile.state;
    const toast = context.Toast;


    const submitFeedback = () => {
        if (!username) {
            toast.dispatch({
                type: "new-toast",
                value: {
                    open: true,
                    severity: "warning",
                    message: "Please login to continue",
                    seconds: 3000,
                }
            })
        } else {
            axiosPost(`feedback`, {
                userFeedback
            }).then(res => {
                if (res.status === 200) {
                    setUseerFeedback("")
                    toast.dispatch({
                        type: "new-toast",
                        value: {
                            open: true,
                            severity: "success",
                            message: "Thank you for your feedback",
                            seconds: 3000,
                        }
                    })
                }
            }).catch(err => {
                toast.dispatch({
                    type: "new-toast",
                    value: {
                        open: true,
                        severity: "error",
                        message: err,
                        seconds: 3000,
                    }
                })
            })
        }
    }


    return (
        <div className={classes.feedback}>
            <div className={classes.description}>
                <h1>Send us your feedback</h1>
                <p>We would love to hear from you</p>
                <p className="secondary-color">Please make sure that you have logged in to submit a feedback</p>
            </div>
            <br></br>
            <div className={classes.feedbackContnet}>
                <TextField
                    id="filled-multiline-static"
                    label="Your feedback"
                    multiline
                    rows={10}
                    value={userFeedback}
                    onChange={(event) => setUseerFeedback(event.target.value)}
                    fullWidth
                />
            </div>

            <div>
                <Button className={classes.actionButtons} variant="outlined" onClick={submitFeedback} color="primary">
                    Submit
        </Button>
                <Button className={classes.actionButtons} variant="outlined" onClick={() => setUseerFeedback("")} color="secondary">
                    Clear
        </Button>
            </div>

        </div>
    )
}

export default Contact;

import React, {useState, useEffect, useContext} from 'react';
import Grid from '@material-ui/core/Grid';
import {axiosGet, axiosPost} from "../../config/axiosClient"
import { makeStyles } from '@material-ui/core/styles';
import Card from "../../components/Card";
import TextField from '@material-ui/core/TextField';
import {Context} from "../../Context/ContextProvier";
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  promotions:  {
    [theme.breakpoints.up('md')]: {
      padding: "4rem"
    },
  },
  description:{
    [theme.breakpoints.up('md')]: {
        padding: "2rem 10rem"
    },
    color: "rgb(255, 56, 92)",
    backgroundColor: "#fcdada"
  },
  feedback:{
      [theme.breakpoints.up('md')]:{
        width: "160%"
      },
      padding: "2rem",
  },
  actionButtons:{
      margin: "2rem"
  }
  
}));

const Contact = () => {
  const classes = useStyles();
  
  const [userFeedback, setUseerFeedback] = useState("")

  const context = useContext(Context)
  const {username} = context.Profile.state;


    const submitFeedback = () =>{
        if(!username){
            alert("please log in to continue")
        }else{
            axiosPost(`feedback`, {
                userFeedback
            }).then(res=>{
                if(res.status === 200){
                    setUseerFeedback("")
                    alert("Thank you for the feedback")
                }
            }).catch(err=>{
                alert(err)
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
        <TextField
          id="filled-multiline-static"
          label="Your feedback"
          multiline
          rows={10}
          value={userFeedback}
          onChange={(event)=>setUseerFeedback(event.target.value)}
          fullWidth
        />
        <div>
        <Button className={classes.actionButtons} variant="outlined" onClick={submitFeedback} color="primary">
            Submit
        </Button>
        <Button className={classes.actionButtons} variant="outlined" onClick={()=>setUseerFeedback("")} color="secondary">
            Clear
        </Button>
        </div>
        
        </div>
    )
}

export default Contact;

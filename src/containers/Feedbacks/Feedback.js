import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import {axiosGet} from "../../config/axiosClient"
import { makeStyles } from '@material-ui/core/styles';
import FeedbackCard from "../../components/FeedbackCard"
import { Typography } from '@material-ui/core';
import { Email } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  promotions:  {
    [theme.breakpoints.up('md')]: {
      padding: "4rem"
    },
  },
  description:{
    [theme.breakpoints.up('md')]: {
        padding: "0 10rem"
    },
    color: "rgb(255, 56, 92)",
    backgroundColor: "#fcdada"
  },
  leaderHeading:{
      paddingTop: "2rem"
  }
}));

const Feedback = () => {
  const classes = useStyles();
  const [feedbacks, setFeedbacks] = useState([]);

    const getAllFeedbacks = () =>{
        axiosGet(`feedback`)
        .then(res=>{
            if(res.status === 200){
                setFeedbacks(res.data)
            }
        })
        .catch(err=>console.log(err, "there is an error"))
    }

    useEffect(() => {
        getAllFeedbacks()
    }, [])

    return (
        <div>
        <div className="container">
            <div className={classes.description}>
                <h1>Users feedbacks</h1>
                <p>These are the feedbacks given by the users</p>
                
            </div>
        </div>
        <Typography className={classes.leaderHeading} color="primary" component="p" variant="p">
            {
                feedbacks.length ? `You have ${feedbacks.length} feedbacks` : `No feedbacks yet`
            }
        </Typography>
        <Grid container className={classes.promotions} spacing={3}>
            {
                feedbacks?.map(feedback => <Grid item xs={12}><FeedbackCard feedback={feedback}/></Grid>)
            }
        </Grid>
        </div>
    )
}

export default Feedback;

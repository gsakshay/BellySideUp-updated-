import React, {useState, useEffect, useContext} from 'react';
import Grid from '@material-ui/core/Grid';
import {axiosDelete, axiosGet} from "../../config/axiosClient"
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import LeaderCard from "../../components/LeaderCard"
import { Typography } from '@material-ui/core';
import { Email } from '@material-ui/icons';
import AddLeader from "../../Dialogs/AddLeader"


import {Context} from "../../Context/ContextProvier"

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
  },
  leaderActionButtons:{
      margin: "1rem"
  }
}));

const About = () => {
  const classes = useStyles();
  const [leaders, setLeaders] = useState([]);

  const context = useContext(Context);
  const user = context.Profile;
  const {username, admin} = user.state;

  const [addLeaderDialog, setAddLeaderDialog] = useState(false)

    const getAllLeaders = () =>{
        axiosGet(`leaders`)
        .then(res=>{
            if(res.status === 200){
                setLeaders(res.data)
            }
        })
        .catch(err=>console.log(err, "there is an error"))
    }

    useEffect(() => {
        getAllLeaders()
    }, [])

    const deleteleads = () =>{
        axiosDelete(`leaders`, {})
            .then(res=>{
                if(res.status === 200){
                    alert(`All leaders have been deleted`)
                    getAllLeaders()
                }
            })
            .catch(err=>alert(err))
    }

    return (
        <div>
        <div className="container">
            <div className={classes.description}>
                <h1>Our History</h1>
                <p>Started in 2015, Belly Side Up quickly established itself as a culinary icon par excellence in Bengaluru. With its unique brand of world class cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in India. Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.But you will be amazed.</p>
                <p>The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Robert , that featured for the first time the world's best cuisines in a pan.</p>
            </div>
        </div>
        <Typography className={classes.leaderHeading} color="primary" component="h3" variant="h3">
            Corporate leadership
        </Typography>
        {
            admin && <>
            <Button variant="outlined" className={classes.leaderActionButtons} onClick={()=>setAddLeaderDialog(true)} color="primary">
                Add leader
            </Button>
            <Button variant="outlined" className={classes.leaderActionButtons} onClick={deleteleads} color="secondary">
                Delete all leaders
            </Button>
            </>
        }
        <Grid container className={classes.promotions} spacing={3}>
            {
                leaders?.map(leader => <Grid item xs={12}><LeaderCard leader={leader} admin={admin} reRenderList={getAllLeaders}/></Grid>)
            }
        </Grid>
    
        <div className="container">
            <div className={classes.description}>
                <h3>Our Address</h3>
                <p>777, The great road Amazing Water Bay, Wonderful avenue
                    Bengaluru</p>
                <p>Phone: 080 1234 5678</p>
                <span>Email:</span><strong>bellysideup@food.net</strong>
            </div>
        </div>
        <AddLeader 
        open={addLeaderDialog}
        setOpen={setAddLeaderDialog}
        reRenderList={getAllLeaders}
        />
        </div>
    )
}

export default About;

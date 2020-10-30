import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import {axiosGet} from "../../config/axiosClient"
import { makeStyles } from '@material-ui/core/styles';
import UserCard from "../../components/UserCard"
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

const Users = () => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);

    const getAllusers = () =>{
        axiosGet(`users`)
        .then(res=>{
            if(res.status === 200){
                setUsers(res.data)
            }
        })
        .catch(err=>console.log(err, "there is an error"))
    }

    useEffect(() => {
        getAllusers()
    }, [])

    return (
        <div>
        <div className="container">
            <div className={classes.description}>
                <h1>All Users</h1>
                <p>These are the users registered for BellySideUp</p>
                
            </div>
        </div>
        <Typography className={classes.leaderHeading} color="primary" component="p" variant="p">
            {
                users.length ? `You have ${users.length} Users` : `No Users yet`
            }
        </Typography>
        <Grid container className={classes.promotions} spacing={3}>
            {
                users?.map(user => <Grid item xs={12} sm={6}><UserCard user={user}/></Grid>)
            }
        </Grid>
        </div>
    )
}

export default Users;

import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import {axiosGet} from "../../config/axiosClient"
import { makeStyles } from '@material-ui/core/styles';
import OrderCard from "../../components/OrderCard"
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

const Order = () => {
  const classes = useStyles();
  const [Orders, setOrders] = useState([]);

    const getAllOrders = () =>{
        axiosGet(`orders`)
        .then(res=>{
            if(res.status === 200){
                setOrders(res.data)
            }
        })
        .catch(err=>console.log(err, "there is an error"))
    }

    useEffect(() => {
        getAllOrders()
    }, [])

    return (
        <div>
        <div className="container">
            <div className={classes.description}>
                <h1>Your orders</h1>
                <p>One place to track all your orders</p>
                <p>We offer you a wide range of dishes to indulge in, be it a steamy cup of hot chocolate to enjoy with your friends on a rainy day or a trip through the tingling flavours of the pizza bursting with cheese.</p>
            </div>
        </div>
        <Typography className={classes.leaderHeading} color="primary" component="p" variant="p">
            {
                Orders.length ? `You have ${Orders.length} Orders` : `Make a new order now`
            }
        </Typography>
        <Grid container className={classes.promotions} spacing={3}>
            {
                Orders?.map(order => <Grid item xs={12}><OrderCard order={order} reRenderList={getAllOrders}/></Grid>)
            }
        </Grid>
        </div>
    )
}

export default Order;

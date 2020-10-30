import React, {useState, useEffect, useContext} from 'react';
import Grid from '@material-ui/core/Grid';
import {axiosGet} from "../../config/axiosClient"
import { makeStyles } from '@material-ui/core/styles';
import Card from "../../components/Card";
import { Typography } from '@material-ui/core';

import {Context} from "../../Context/ContextProvier";

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
      margin: "2rem"
  }
  
}));

const Favorites = () => {
  const classes = useStyles();

  const context = useContext(Context);
  const favorites = context.Favorites;
  const {favoriteList} = favorites.state;

    const getAllFavorites = () =>{
        axiosGet(`users/favorites/all`)
        .then(res=>{
            if(res.status === 200){
                favorites.dispatch({
                    type: "fav-list",
                    value: res.data
                })
            }
        })
        .catch(err=>console.log(err, "there is an error"))
    }

    useEffect(() => {
        getAllFavorites()
    }, [])

    return (
        <div>
        <div className="container">
            <div className={classes.description}>
                <h1>Your favorites</h1>
                <p>All your want in a single place</p>
                <p>We offer you a wide range of favorites to indulge in, be it a steamy cup of hot chocolate to enjoy with your friends on a rainy day or a trip through the tingling flavours of the pizza bursting with cheese.
                </p>
            </div>
        </div>
        <Typography className={classes.leaderHeading} color="primary" component="p" variant="p">
            {
                favoriteList?.length ? `You have ${favoriteList?.length} favorites` : `Add some favorites`
            }
        </Typography>
        <Grid container className={classes.promotions} spacing={3}>
            {
                favoriteList?.map(favorites => <Grid item xs={12} sm={6} md={4}><Card content={favorites.dish} reRenderFavoriteList={getAllFavorites} favorite={true}/></Grid>)
            }
        </Grid>
        </div>
    )
}

export default Favorites;

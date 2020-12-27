import React, { useState, useEffect, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import { axiosDelete, axiosGet, axiosPost } from "../../config/axiosClient"
import { makeStyles } from '@material-ui/core/styles';
import Card from "../../components/Card";
import Button from '@material-ui/core/Button';
import { useHistory, useParams } from "react-router-dom"
import CommentsCard from '../../components/CommentsCard';

import { Context } from "../../Context/ContextProvier"

const useStyles = makeStyles((theme) => ({
    promotions: {
        [theme.breakpoints.up('md')]: {
            padding: "4rem"
        },
    },
    description: {
        [theme.breakpoints.up('md')]: {
            padding: "0 10rem"
        },
        color: "rgb(255, 56, 92)",
        backgroundColor: "#fcdada"
    },
    favButton: {
        margin: "1rem 0"
    }

}));

const SingleDish = () => {
    const classes = useStyles();
    const [dishDetails, setDishDetails] = useState({});
    const [comments, setComments] = useState([]);

    const slug = useParams();
    const dishId = slug.dishId;

    const history = useHistory()

    const context = useContext(Context);
    const toast = context.Toast;
    const user = context.Profile;
    const { username, admin } = user.state;
    /* const favorites = context.Favorites;
    const [isFavorite, setIsFavorite] = useState(false); */

    const getDishDetails = () => {
        axiosGet(`dishes/${dishId}`)
            .then(res => {
                if (res.status === 200) {
                    setDishDetails(res.data)
                }
            })
            .catch(err => console.log(err, "there is an error"))
    }

    const getAllComments = () => {
        axiosGet(`comments/${dishId}`)
            .then(res => {
                if (res.status === 200) {
                    setComments(res.data)
                }
            })
            .catch(err => console.log(err))
    }

    /* const getAllFavorites = () =>{
    axiosGet(`users/favorites/all`)
    .then(res=>{
        if(res.status === 200){
            favorites.dispatch({
                type: "fav-list",
                value: res.data
            })
            const list = res.data.filter(fav=> fav?.dishId == dishId);
            if(list.length){
                isFavorite(true)
            }
        }
    })
    .catch(err=>console.log(err, "there is an error"))
  } */

    useEffect(() => {
        getDishDetails();
        getAllComments();
        /* getAllFavorites(); */
    }, [])

    const addFavorite = () => {
        axiosPost(`users/favorites/${dishId}`, {})
            .then(res => {
                if (res.status === 200) {
                    toast.dispatch({
                        type: "new-toast",
                        value: {
                            open: true,
                            severity: "success",
                            message: "Dish added to favorites",
                            seconds: 3000,
                        }
                    })
                    history.push("/favorites")
                }
            })
            .catch(err => toast.dispatch({
                type: "new-toast",
                value: {
                    open: true,
                    severity: "info",
                    message: "Dish is already in the favorites list",
                    seconds: 3000,
                }
            }))
    }

    const orderDish = () => {
        axiosPost(`orders/${dishId}`, {})
            .then(res => {
                if (res.status === 200) {
                    toast.dispatch({
                        type: "new-toast",
                        value: {
                            open: true,
                            severity: "success",
                            message: "Dish has been ordered and will be delevered in some time",
                            seconds: 3000,
                        }
                    })
                    history.push("/orders")
                }
            })
            .catch(err => toast.dispatch({
                type: "new-toast",
                value: {
                    open: true,
                    severity: "error",
                    message: err,
                    seconds: 3000,
                }
            }))
    }

    return (
        <div>
            <div className="container">
                <div className={classes.description}>
                    <h1>Cuisine</h1>
                    <p>We offer you a wide range of dishes to indulge in, be it a steamy cup of hot chocolate to enjoy with your friends on a rainy day or a trip through the tingling flavours of the pizza bursting with cheese.
                </p>
                </div>
            </div>
            <Grid container className={classes.promotions} spacing={6}>
                <Grid item xs={12} sm={5} ><Card content={dishDetails} single={true} /></Grid>
                <Grid item xs={10} sm={4} ><CommentsCard comments={comments} dishId={dishId} reRenderList={getAllComments} /></Grid>
                <Grid item xs={3} >
                    {
                        username &&
                        <>
                            <Button variant="contained" onClick={orderDish} size="large" color="primary">
                                Order Now
                        </Button>
                            <Button variant="outlined" onClick={addFavorite} className={classes.favButton} color="secondary">
                                Add Favorite
                        </Button>
                        </>
                    }

                </Grid>
            </Grid>
        </div>
    )
}

export default SingleDish;

import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import {axiosGet, axiosPost} from "../../config/axiosClient"
import { makeStyles } from '@material-ui/core/styles';
import Card from "../../components/Card";
import Button from '@material-ui/core/Button';
import {useHistory, useParams} from "react-router-dom"
import CommentsCard from '../../components/CommentsCard';

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
  }
  
}));

const SingleDish = () => {
  const classes = useStyles();
  const [dishDetails, setDishDetails] = useState({});
  const [comments, setComments] = useState([]);
  
  const slug = useParams();
  const dishId = slug.dishId;

    const getAllDishes = () =>{
        axiosGet(`dishes/${dishId}`)
        .then(res=>{
            if(res.status === 200){
                setDishDetails(res.data)
            }
        })
        .catch(err=>console.log(err, "there is an error"))
    }

    const getAllComments = () =>{
        axiosGet(`comments/${dishId}`)
        .then(res=>{
            if(res.status === 200){
                setComments(res.data)
            }
        })
        .catch(err=>console.log(err))
    }

    useEffect(() => {
        getAllDishes();
        getAllComments();
    }, [])

    const orderDish = () =>{
        axiosPost(`orders/${dishId}`, {})
            .then(res=>{
                if(res.status === 200){
                    alert("Dish has been ordered and will be delievered in some time")
                }
            })
            .catch(err=>alert(err))
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
            <Grid item xs={12} sm={5} ><Card content={dishDetails} single={true}/></Grid>
            <Grid item xs={10} sm={4} ><CommentsCard comments={comments} dishId={dishId} reRenderList={getAllComments}/></Grid>
            <Grid item xs={2} >
                <Button variant="contained" onClick={orderDish} size="large" color="primary">
                Order Now
                </Button>
            </Grid>
        </Grid>
        </div>
    )
}

export default SingleDish;

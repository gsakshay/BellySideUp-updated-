import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import {axiosGet} from "../../config/axiosClient"
import { makeStyles } from '@material-ui/core/styles';
import Card from "../../components/Card"

const useStyles = makeStyles((theme) => ({
  promotions: {
    padding: "4rem"
  }
}));

const Home = () => {
  const classes = useStyles();
  const [promotion, setPromotion] = useState([]);

    const getAllPromotions = () =>{
        axiosGet(`promotions`)
        .then(res=>{
            if(res.status === 200){
                setPromotion(res.data)
            }
        })
        .catch(err=>console.log(err, "there is an error"))
    }

    useEffect(() => {
        getAllPromotions()
    }, [])

    return (
        <div>
        <div className="container">
            <div className="main-desc">
                <h1>Belly Side Up</h1>
                <p>A Haven of feel-good food and the harbour for all those satisfactory burps, this cafe/restaurant is the place that will bring a smile on your faces and your pockets. We offer you a wide range of dishes to indulge in, be it a steamy cup of hot chocolate to enjoy with your friends on a rainy day or a trip through the tingling flavours of the pizza bursting with cheese. Take a step towards our humble establishment to lose yourself to your cravings and dive into our food until you're Belly Side Up!</p>
            </div>
        </div>
        <Grid container className={classes.promotions} spacing={3}>
            {
                promotion?.map(prom => <Grid item xs={12} sm={6} md={4}><Card content={prom} /></Grid>)
            }
        </Grid>
        </div>
    )
}

export default Home;

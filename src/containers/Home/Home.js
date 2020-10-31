import React, { useState, useEffect, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import { axiosDelete, axiosGet } from "../../config/axiosClient"
import { makeStyles } from '@material-ui/core/styles';
import Card from "../../components/Card";
import Button from '@material-ui/core/Button';
import PromotionCard from "../../components/PromotionCard";
import AddPromotion from "../../Dialogs/AddPromotion"

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
    newDishButton: {
        margin: "2rem 2rem 0 0",
    }

}));

const Home = () => {
    const classes = useStyles();
    const [promotion, setPromotion] = useState([]);
    const [dishes, setDishes] = useState([])
    const [leaders, setLeaders] = useState([]);
    const [promotionFiltered, setPromotionFiltered] = useState([])

    const [addPromotionDialog, setAddPromotionDialog] = useState(false)

    const context = useContext(Context);
    const user = context.Profile;
    const { username, admin } = user.state;
    const toast = context.Toast;

    console.log(toast)

    const getAllPromotions = () => {
        axiosGet(`promotions`)
            .then(res => {
                if (res.status === 200) {
                    setPromotion(res?.data)
                    setPromotionFiltered(res?.data?.filter(prom => prom.featured))
                }
            })
            .catch(err => console.log(err, "there is an error"))
    }

    const getAllDishes = () => {
        axiosGet(`dishes`)
            .then(res => {
                if (res.status === 200) {
                    setDishes(res?.data?.filter(dish => dish.featured))
                }
            })
            .catch(err => console.log(err, "there is an error"))
    }

    const getAllLeaders = () => {
        axiosGet(`leaders`)
            .then(res => {
                if (res.status === 200) {
                    setLeaders(res.data?.filter(leader => leader.featured))
                }
            })
            .catch(err => console.log(err, "there is an error"))
    }

    useEffect(() => {
        getAllPromotions();
        getAllDishes();
        getAllLeaders();
    }, [])

    const deleteAllPromotions = () => {
        axiosDelete(`promotions`, {})
            .then(res => {
                if (res.status === 200) {
                    toast.dispatch({
                        type: "new-toast",
                        value: {
                            open: true,
                            severity: "success",
                            message: "All promotions have been deleted successfully",
                            seconds: 3000,
                        }
                    })
                    getAllPromotions()
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
                    <h1>Belly Side Up</h1>
                    <p>A Haven of feel-good food and the harbour for all those satisfactory burps, this cafe/restaurant is the place that will bring a smile on your faces and your pockets. We offer you a wide range of dishes to indulge in, be it a steamy cup of hot chocolate to enjoy with your friends on a rainy day or a trip through the tingling flavours of the pizza bursting with cheese. Take a step towards our humble establishment to lose yourself to your cravings and dive into our food until you're Belly Side Up!</p>
                </div>
            </div>
            {
                admin && <>
                    <Button className={classes.newDishButton} variant="outlined" onClick={() => setAddPromotionDialog(true)} color="primary">
                        Add Promotion
            </Button>
                    <Button className={classes.newDishButton} variant="outlined" onClick={deleteAllPromotions} color="secondary">
                        Delete all promotions
            </Button>
                </>
            }
            <Grid container className={classes.promotions} spacing={3}>
                {
                    admin ? promotion?.map(prom => <Grid item xs={12} sm={6} md={4}><PromotionCard content={prom} admin={admin} promoList={true} reRenderList={getAllPromotions} /></Grid>)
                        :
                        promotionFiltered?.map(prom => <Grid item xs={12} sm={6} md={4}><PromotionCard content={prom} admin={admin} promoList={true} reRenderList={getAllPromotions} /></Grid>)
                }
                {
                    dishes?.map(dishes => <Grid item xs={12} sm={6} md={4}><PromotionCard content={dishes} /></Grid>)
                }
                {
                    leaders?.map(leaders => <Grid item xs={12} sm={6} md={4}><PromotionCard content={leaders} /></Grid>)
                }
            </Grid>
            <AddPromotion
                open={addPromotionDialog}
                setOpen={setAddPromotionDialog}
                reRenderList={getAllPromotions}
            />
        </div>
    )
}

export default Home;

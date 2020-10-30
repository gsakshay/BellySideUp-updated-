import React, {useState, useEffect, useContext} from 'react';
import Grid from '@material-ui/core/Grid';
import {axiosDelete, axiosGet} from "../../config/axiosClient"
import { makeStyles } from '@material-ui/core/styles';
import Card from "../../components/Card";
import Button from '@material-ui/core/Button';
import AddDish from "../../Dialogs/AddDish"


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
  newDishButton:{
      margin: "2rem 2rem 0 0"
  }
  
}));

const Menu = () => {
  const classes = useStyles();
  const [dishes, setDishes] = useState([]);

    const [addDishDialog, setAddDishDialog] = useState(false);

    const context = useContext(Context);
    const user = context.Profile;
    const {username, admin} = user.state;

    const getAllDishes = () =>{
        axiosGet(`dishes`)
        .then(res=>{
            if(res.status === 200){
                setDishes(res.data)
            }
        })
        .catch(err=>console.log(err, "there is an error"))
    }

    useEffect(() => {
        getAllDishes()
    }, [])

    const deleteAllDishes = () =>{
        axiosDelete(`dishes`, {})
            .then(res=>{
                if(res.status === 200){
                    alert(`All dishes have been siccessfully deleted`);
                    getAllDishes()
                }
            })
            .catch(err=>console.log(err))
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
        {
            admin && <>
            <Button className={classes.newDishButton} onClick={()=>setAddDishDialog(true)} variant="outlined" color="primary">
                Add Dish
            </Button>
            <Button className={classes.newDishButton} onClick={deleteAllDishes} variant="outlined" color="secondary">
                Delete all dishes
            </Button>
            </>
        }
        <Grid container className={classes.promotions} spacing={3}>
            {
                dishes?.map(dish => <Grid item xs={12} sm={6} md={4}><Card content={dish} admin={admin} reRenderDishList={getAllDishes}/></Grid>)
            }
        </Grid>
        <AddDish 
        open={addDishDialog}
        setOpen={setAddDishDialog}
        reRenderList={getAllDishes}
        />
        </div>
    )
}

export default Menu;

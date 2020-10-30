import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import {Badge} from "@material-ui/core"
import { useHistory } from 'react-router-dom';
import { axiosPost, axiosDelete } from '../config/axiosClient';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  root: {
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  promotions: {
    padding: "4rem"
  },
}));

const CustomCard = ({content, single, favorite,reRenderFavoriteList, admin, reRenderDishList}) =>{
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const history = useHistory()

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    
    const addFavorite = () =>{
        axiosPost(`users/favorites/${content.id}`, {})
            .then(res=>{
                if(res.status === 200){
                    alert("Dish added to favorites")
                }
            })
            .catch(err=>alert(err))
    }

    const removeFavorite = () =>{
        axiosDelete(`users/favorites/${content.id}`, {})
            .then(res=>{
                if(res.status === 200){
                    alert("Dish Removed from favorites");
                    reRenderFavoriteList()
                }
            })
            .catch(err=>alert(err))
    }

    const deleteDish = () =>{
        axiosDelete(`dishes/${content.id}`, {})
        .then(res=>{
            if(res.status === 200){
                alert(`Dish is deleted`);
                reRenderDishList()
            }
        })
        .catch(err=>alert(err))
    }
 
    return(
        <Card className={classes.root}>
            <CardHeader
                title={
                    <Typography variant="h6" color="primary">
                        {content.name}
                    </Typography>
                }
                subheader={
                    <Badge badgeContent={content.category} color="secondary"></Badge>
                }
                action={(admin && !favorite) &&
                    <><IconButton><EditIcon color="primary"/></IconButton>
                    <IconButton onClick={deleteDish}><DeleteIcon color="secondary"/></IconButton>
                    </>
                }
            />
            <CardMedia
                className={classes.media}
                image={`http://localhost:3000//images//Screenshot%20(30).png`}
                title="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                <Chip color="primary" label={`₹ ${content.price}`} variant="outlined" /> 
                </Typography>
                <br></br>
                {
                    single ? null :<Button onClick={()=>history.push(`/menu/${content.id}`)} color="secondary">Check out</Button>
                }
            </CardContent>
            <CardActions disableSpacing>
                {
                    favorite ? <Button onClick={removeFavorite} variant="outlined" color="primary">
                    Remove favorite
                </Button> : <Button onClick={addFavorite} variant="outlined" color="secondary">
                    Add favorite<FavoriteIcon />
                </Button>
                }
                                
                <IconButton
                className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
                >
                <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                <Typography paragraph>Desc:</Typography>
                <Typography paragraph>
                    {content.description}
                </Typography>
                </CardContent>
            </Collapse>
        </Card>
    )
}

export default CustomCard;
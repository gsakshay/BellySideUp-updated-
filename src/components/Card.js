import React, { useState, useEffect, useContext } from 'react';
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
import { Badge } from "@material-ui/core"
import { useHistory } from 'react-router-dom';
import { axiosPost, axiosDelete, axiosGet } from '../config/axiosClient';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { URL } from "../config/config"

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

import EditDish from "../Dialogs/AddDish"

import { Context } from "../Context/ContextProvier"

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

const CustomCard = ({ content, single, favorite, admin, reRenderDishList }) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const [editDishDialog, setEditDishDialog] = useState(false)

    const history = useHistory()

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const context = useContext(Context);
    const favorites = context.Favorites;
    const { favoriteList } = favorites.state;
    const [isFavourite, setIsFavorite] = useState(0);

    const [favoriteChanged, setFavoriteChange] = useState(true)

    const toast = context.Toast;

    const getAllFavorites = () => {
        axiosGet(`users/favorites/all`)
            .then(res => {
                if (res.status === 200) {
                    favorites.dispatch({
                        type: "fav-list",
                        value: res.data
                    })
                }
            })
            .catch(err => console.log(err, "there is an error"))
    }


    const addFavorite = () => {
        axiosPost(`users/favorites/${content.id}`, {})
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
                    getAllFavorites()
                    setFavoriteChange(preVal => !preVal)
                    history.push("/favorites")
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

    const removeFavorite = () => {
        axiosDelete(`users/favorites/${content.id}`, {})
            .then(res => {
                if (res.status === 200) {
                    toast.dispatch({
                        type: "new-toast",
                        value: {
                            open: true,
                            severity: "success",
                            message: "Dish Removed from favorites",
                            seconds: 3000,
                        }
                    })
                    getAllFavorites();
                    setFavoriteChange(preVal => !preVal);
                    setIsFavorite(false)
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

    const deleteDish = () => {
        axiosDelete(`dishes/${content.id}`, {})
            .then(res => {
                if (res.status === 200) {
                    toast.dispatch({
                        type: "new-toast",
                        value: {
                            open: true,
                            severity: "success",
                            message: "Dish is deleted",
                            seconds: 3000,
                        }
                    })
                    reRenderDishList()
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

    const decideFavorite = () => {
        const list = favoriteList.filter(fav => fav.dishId === content.id);
        setIsFavorite(list.length ? true : false)
    }

    useEffect(() => {
        decideFavorite()
    }, [])
    useEffect(() => {
        decideFavorite()
    }, [favoriteChanged])

    return (
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
                    <><IconButton onClick={() => setEditDishDialog(true)}><EditIcon color="primary" /></IconButton>
                        <IconButton onClick={deleteDish}><DeleteIcon color="secondary" /></IconButton>
                    </>
                }
            />
            <CardMedia
                className={classes.media}
                image={`${URL}/${content.image}`}
                title="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    <Chip color="primary" label={`₹ ${content.price}`} variant="outlined" />
                </Typography>
                <br></br>
                {
                    single ? null : <Button onClick={() => history.push(`/menu/${content.id}`)} color="secondary">Check out</Button>
                }
            </CardContent>
            <CardActions disableSpacing>
                {
                    favorite ? <Button variant="outlined" onClick={removeFavorite} className={classes.favButton} color="primary">
                        Remove Favorite
                    </Button> : `Read more in the description`
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
            <EditDish
                open={editDishDialog}
                setOpen={setEditDishDialog}
                edit={true}
                dish={content}
                reRenderList={reRenderDishList}
            />
        </Card>
    )
}

export default CustomCard;
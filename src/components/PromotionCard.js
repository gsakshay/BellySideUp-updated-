import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import {Badge} from "@material-ui/core"
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { axiosDelete } from '../config/axiosClient';
import EditPromotion from "../Dialogs/AddPromotion";

import {URL} from "../config/config"

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function PromotionCard({content, admin,  promoList, reRenderList}) {
  const classes = useStyles();

  const [editPromotionDialog, setEditPromotionDialog] = useState(false)

  const deletePromo = () =>{
    axiosDelete(`promotions/${content.id}`, {})
      .then(res=>{
        if(res.status === 200){
          alert("Promotion deleted successfully")
          reRenderList()
        }
      })
      .catch(err=>alert(err))
  }

  return (
    <Card className={classes.root}>
      {
        (admin && promoList) && <>
        <IconButton onClick={()=>setEditPromotionDialog(true)}><EditIcon color="primary"/></IconButton>
        <IconButton onClick={deletePromo}><DeleteIcon color="secondary"/></IconButton>
        </>
      }
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={`${URL}/${content.image}`}
          title={content.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {content.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {content.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <EditPromotion 
      open={editPromotionDialog}
      setOpen={setEditPromotionDialog}
      edit={true}
      promotion={content}
      reRenderList={reRenderList}
      />
    </Card>
  );
}


import React, {useState} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import { axiosDelete } from '../config/axiosClient';
import EditLeader from "../Dialogs/AddLeader"

import {URL} from "../config/config"

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: "100%"
  },
}));

export default function MediaControlCard({leader, admin, reRenderList}) {
  const classes = useStyles();
  const theme = useTheme();

  const [editLeaderDialog, setEditLeaderDialog] = useState(false);

  const deleteChef = () =>{
    axiosDelete(`leaders/${leader.id}`, {})
    .then(res=>{
      if(res.status === 200){
        alert(`The leader has been deleted`)
        reRenderList()
      }
    })

  }

  return (
    <Card className={classes.root}>
        <CardMedia
        className={classes.cover}
        image={`${URL}/${leader.image}`}
      />
      <div className={classes.details}>
        {
          admin && <CardHeader action={
            <><IconButton onClick={()=>setEditLeaderDialog(true)}><EditIcon color="primary"/></IconButton>
            <IconButton onClick={deleteChef}><DeleteIcon color="secondary"/></IconButton>
            </>
          } />
        }
        <CardContent className={classes.content}>
          <Typography color="primary" component="h5" variant="h5">
            {leader.name}
          </Typography>
          <Typography color="secondary" component="span" variant="h6">
            {`Designation: ${leader.designation}`}
          </Typography>
            {/*<Typography color="primary" component="span" variant="h6">
            {`  ${leader.abbr}`}
          </Typography> */}
          <Typography variant="subtitle1" color="textSecondary">
            {leader.description}
          </Typography>
        </CardContent>
      </div>
      <EditLeader 
      open={editLeaderDialog}
      setOpen={setEditLeaderDialog}
      edit={true}
      leader={leader}
      reRenderList={reRenderList}    
      />
    </Card>
  );
}

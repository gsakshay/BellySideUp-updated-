import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SendIcon from "@material-ui/icons/Send";
import StarBorder from "@material-ui/icons/StarBorder";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {getDateInRequiredFormat} from "../config/dataModifiers";
import CreateIcon from '@material-ui/icons/Create';
import TextField from '@material-ui/core/TextField';
import { axiosPost } from "../config/axiosClient";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing(4)
  },
  cardRoot: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  cancelButton:{
      marginRight: "1rem"
  },
  newComment:{
      margin: "1rem 0"
  }
}));

export default function CommentsCard({comments, dishId, reRenderList}) {
  const classes = useStyles();

  const [openEditor, setOpenEditor] = useState(false);
  const [newcomment, setNewcomment] = useState("")

  const postComment = () =>{
    axiosPost(`comments/${dishId}`,{
        rating: 5,
        comment: newcomment
    }).then(res=>{
        if(res.status === 200){
            alert(`Your comment has been posted`)
            reRenderList()
            setOpenEditor(false)
            setNewcomment("")
        }
    })
  }

  return (
      <Card className={classes.cardRoot} variant="outlined">
      <CardContent>
        <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader color="primary" component="strong" id="nested-list-subheader">
                    Comments
                </ListSubheader>
            }
            className={classes.root}
            >
            {
                comments.map(comment=>{
                    return(
                        <>
                        <ListItem button>
                            <ListItemIcon>
                            <SendIcon color="primary"/>
                            </ListItemIcon>
                            <ListItemText primary={`${comment?.comment}`} />
                        </ListItem>
                        <Collapse in={true} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                            <ListItem className={classes.nested}>
                                <ListItemIcon>
                                <AccountCircleIcon color="secondary" />
                                </ListItemIcon>
                                <ListItemText primary={`${comment?.user?.username}`} secondary={`${getDateInRequiredFormat(comment?.createdAt)}`} />
                            </ListItem>
                            </List>
                        </Collapse>
                        </>
                    )
                })
            }             
        </List>{
            openEditor && 
            <TextField className={classes.newComment} value={newcomment} onChange={(event)=>setNewcomment(event.target.value)} id="outlined-basic" label="Your comment" variant="outlined" fullWidth/>
        }
           
        {
        openEditor ? <>
        <Button className={classes.cancelButton} onClick={()=>{setOpenEditor(false)
        setNewcomment("")}} variant="outlined" color="secondary">
            Cancel
        </Button> 
        <Button onClick={postComment} variant="contained" color="primary">
            Post
        </Button> 
        </>: <Button onClick={()=>setOpenEditor(true)} variant="outlined" color="secondary">
            <CreateIcon color="primary"/>Add a comment
        </Button>
        }
        
      </CardContent>
    </Card>
    
  );
}

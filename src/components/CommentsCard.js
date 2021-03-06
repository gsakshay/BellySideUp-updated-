import React, { useState, useContext } from "react";
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
import { getDateInRequiredFormat } from "../config/dataModifiers";
import CreateIcon from '@material-ui/icons/Create';
import TextField from '@material-ui/core/TextField';
import { axiosPost, axiosDelete } from "../config/axiosClient";
import { Context } from "../Context/ContextProvier";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

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
  cancelButton: {
    marginRight: "1rem"
  },
  newComment: {
    margin: "1rem 0"
  }
}));

export default function CommentsCard({ comments, dishId, reRenderList }) {

  const classes = useStyles();

  const [openEditor, setOpenEditor] = useState(false);
  const [newcomment, setNewcomment] = useState("")

  const context = useContext(Context)
  const user = context.Profile;
  const { username, admin, id } = user.state;
  const toast = context.Toast

  const postComment = () => {
    axiosPost(`comments/${dishId}`, {
      comment: newcomment
    }).then(res => {
      if (res.status === 200) {
        toast.dispatch({
          type: "new-toast",
          value: {
            open: true,
            severity: "success",
            message: "Your comment has been posted",
            seconds: 3000,
          }
        })
        reRenderList()
        setOpenEditor(false)
        setNewcomment("")
      }
    })
  }

  const deleteComment = (commentId) => {
    axiosDelete(`comments/delete/${commentId}`)
      .then(res => {
        if (res.status === 200) {
          toast.dispatch({
            type: "new-toast",
            value: {
              open: true,
              severity: "success",
              message: "Your comment has been deleted",
              seconds: 3000,
            }
          })
          reRenderList()
        } else {
          toast.dispatch({
            type: "new-toast",
            value: {
              open: true,
              severity: "alert",
              message: "Please try again",
              seconds: 3000,
            }
          })
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
            comments.map(comment => {
              return (
                <>
                  <ListItem button>
                    <ListItemIcon>
                      <SendIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={`${comment?.comment}`} />
                    {
                      (comment.userId === id) ? <>
                        {/* <IconButton><EditIcon color="primary" /></IconButton> */}
                        <IconButton onClick={() => deleteComment(comment.id)}><DeleteIcon color="secondary" /></IconButton>
                      </> : null
                    }
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
          <TextField className={classes.newComment} value={newcomment} onChange={(event) => setNewcomment(event.target.value)} id="outlined-basic" label="Your comment" variant="outlined" fullWidth />
        }

        {
          openEditor ? <>
            <Button className={classes.cancelButton} onClick={() => {
              setOpenEditor(false)
              setNewcomment("")
            }} variant="outlined" color="secondary">
              Cancel
        </Button>
            <Button onClick={postComment} variant="contained" color="primary">
              Post
        </Button>
          </> : username && <Button Button onClick={() => setOpenEditor(true)} variant="outlined" color="secondary">
            <CreateIcon color="primary" />Add a comment
        </Button>
        }

      </CardContent>
    </Card>
  );
}

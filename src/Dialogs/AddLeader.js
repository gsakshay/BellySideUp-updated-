import React, { useReducer, useState, useEffect, useContext } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { axiosPost, axiosPut } from '../config/axiosClient';
import { Context } from '../Context/ContextProvier';

const useStyles = makeStyles({
  dialog: {
    padding: "20rem"
  },
  dialogActions: {
    margin: "0",
    textAlign: "center"
  },
  featuredLabel: {
    margin: "1rem 0"
  }
})

const initialState = {
  name: "",
  abbreviation: "",
  featured: false,
  designation: "",
  description: ""
};

const reducer = (state, action) => {
  switch (action.type) {
    case "name":
      return { ...state, name: action.value };
    case "abbreviation":
      return { ...state, abbreviation: action.value };
    case "designation":
      return { ...state, designation: action.value };
    case "featured":
      return { ...state, featured: !state.featured };
    case "description":
      return { ...state, description: action.value };
    case "all":
      return {
        ...state,
        name: action.value.name,
        abbreviation: action.value.abbr,
        designation: action.value.designation,
        featured: action.value.featured,
        description: action.value.description,
      };
    case "reset":
      return initialState;
    default:
      return state;
  }
};



export default function FormDialog({ open, setOpen, reRenderList, edit, leader }) {

  const classes = useStyles()

  const [leaderData, dispatch] = useReducer(reducer, initialState);

  const [image, setImage] = useState({});


  const context = useContext(Context)
  const toast = context.Toast

  const handleClose = () => {
    setOpen(false);
    if (edit) {
      dispatch({ type: "all", value: leader })
    } else {
      dispatch({ type: "reset", value: "" })
    }
  };

  const addleader = () => {
    if (edit) {
      axiosPut(`leaders/${leader.id}`, {
        name: leaderData.name,
        abbr: leaderData.abbreviation,
        featured: leaderData.featured,
        designation: leaderData.designation,
        description: leaderData.description
      })
        .then(res => {
          if (res.status === 200) {
            toast.dispatch({
              type: "new-toast",
              value: {
                open: true,
                severity: "success",
                message: "Leader was updated successfully",
                seconds: 3000,
              }
            })
            reRenderList()
            handleClose()
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
    } else {
      const formData = new FormData()
      formData.set("name", leaderData.name)
      formData.set("abbr", leaderData.abbreviation)
      formData.set("designation", leaderData.designation)
      formData.set("description", leaderData.description)
      formData.set("featured", leaderData.featured)
      formData.append("image", image)
      axiosPost(`leaders`, formData)
        .then(res => {
          if (res.status === 200) {
            toast.dispatch({
              type: "new-toast",
              value: {
                open: true,
                severity: "success",
                message: "New leader was successfully uploaded",
                seconds: 3000,
              }
            })
            reRenderList()
            handleClose()
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
  }

  useEffect(() => {
    if (edit && leader) {
      dispatch({ type: "all", value: leader })
    }
  }, [edit, leader])

  return (
    <div className="add-dialogs">
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle color="primary" id="form-dialog-title">{
          edit ? `Edit leader` : `Add leader`
        }
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            To make changes to the leader please fill in all the details and save the changes, we will make it reflect in the website
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            value={leaderData.name}
            onChange={(event) => dispatch({ type: "name", value: event.target.value })}
            id="name"
            label="Name"
            type="name"
            fullWidth
          />
          <TextField
            margin="dense"
            value={leaderData.abbreviation}
            id="abbreviation"
            onChange={(event) => dispatch({ type: "abbreviation", value: event.target.value })}
            label="Abbreviation"
            type="abbreviation"
            fullWidth
          />
          <FormControlLabel
            className={classes.featuredLabel}
            control={<Checkbox checked={leaderData.featured} onChange={() => dispatch({ type: "featured", })} name="featured" />}
            label="Featured"
          />
          {
            edit ? null : <div>
              <label>Upload an image for the leader: </label>
              <input type="file" onChange={(event) => setImage(event.target.files?.[0])} />
            </div>
          }
          <TextField
            margin="dense"
            value={leaderData.designation}
            id="designation"
            onChange={(event) => dispatch({ type: "designation", value: event.target.value })}
            label="Designation"
            type="designation"
            fullWidth
          />
          <TextField
            multiline
            margin="dense"
            value={leaderData.description}
            rows="4"
            id="description"
            onChange={(event) => dispatch({ type: "description", value: event.target.value })}
            label="Description"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={addleader} color="primary">
            {
              edit ? `Edit leader` : `Add leader`
            }
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

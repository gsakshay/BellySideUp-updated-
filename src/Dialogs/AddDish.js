import React, {useReducer, useState, useEffect} from 'react';
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

const useStyles = makeStyles({
    dialog:{
        padding: "20rem"
    },
    dialogActions:{
        margin: "0",
        textAlign: "center"
    },
    featuredLabel:{
        margin: "1rem 0"
    }
})

const initialState = {
  name: "",
  label: "",
  featured: false,
  amount: 0,
  description: "",
  category: ""
};

const reducer = (state, action) => {
  switch (action.type) {
    case "name":
      return { ...state, name: action.value };
    case "label":
      return { ...state, label: action.value };
    case "amount":
      return { ...state, amount: action.value };  
    case "featured":
      return { ...state, featured: !state.featured };
    case "description":
      return { ...state, description: action.value };
    case "category":
      return { ...state, category: action.value };
    case "all":
      return {...state, 
          name:action.value.name,
          label: action.value.label,
          amount: action.value.price,
          featured: action.value.featured,
          description: action.value.description,
          category: action.value.category 
      };          
    case "reset":
      return initialState;
    default:
      return state;
  }
};



export default function FormDialog({open, setOpen, reRenderList, edit, dish}) {

  const classes = useStyles()  

  const [dishData, dispatch] = useReducer(reducer, initialState);

  const [image, setImage] = useState({});

  const handleClose = () => {
    setOpen(false);
    if(edit){
      dispatch({type:"all", value:dish})
    }else{
      dispatch({type:"reset", value:""})
    }
  };

  const adddish = () =>{
    if(edit){
      axiosPut(`dishes/${dish.id}`, {
        name: dishData.name,
        label: dishData.label,
        featured: dishData.featured,
        price: dishData.amount,
        description: dishData.description,
        category: dishData.category
      })
        .then(res=>{
            if(res.status === 200){
                alert(`Dish was successfully updated`);
                reRenderList()
                handleClose()
            }
        })
        .catch(err=>alert(err))
    }else{
      const formData = new FormData()
      formData.set("name" ,dishData.name)
      formData.set("label" ,dishData.label)
      formData.set("price" ,dishData.amount)
      formData.set("description" ,dishData.description)
      formData.set("featured" ,dishData.featured)
      formData.set("category" ,dishData.category)
      formData.append("image" ,image)
      axiosPost(`dishes`, formData)
        .then(res=>{
            if(res.status === 200){
                alert(`New dish was successfully uploaded`);
                reRenderList()
                handleClose()
            }
        })
        .catch(err=>alert(err))
    }
  }

  useEffect(() => {
    if(edit && dish){
      dispatch({type:"all", value:dish})
    }
  }, [edit, dish])

  return (
    <div className="add-dialogs">
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle color="primary" id="form-dialog-title">{
          edit ? `Edit dish` : `Add dish`
        }
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            To make changes to the dish please fill in all the details and save the changes, we will make it reflect in the website
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            value={dishData.name}
            onChange={(event)=>dispatch({type:"name", value:event.target.value})}
            id="name"
            label="Name"
            type="name"
            fullWidth
          />
{/*           <TextField
            margin="dense"
            value={dishData.label}
            id="label"
            onChange={(event)=>dispatch({type:"label", value:event.target.value})}
            label="Label"
            type="label"
            fullWidth
          /> */}
          <TextField
            margin="dense"
            value={dishData.category}
            id="label"
            onChange={(event)=>dispatch({type:"category", value:event.target.value})}
            label="Category"
            type="category"
            fullWidth
          />
        <FormControlLabel
        className={classes.featuredLabel}
            control={<Checkbox checked={dishData.featured} onChange={()=>dispatch({type:"featured", })} name="featured" />}
            label="Featured"
        />
          {
            edit ? null : <div>
              <label>Upload an image for the dish: </label>
              <input type="file" onChange={(event)=>setImage(event.target.files?.[0])} />
          </div>
          }
          <TextField
            margin="dense"
            value={dishData.amount}
            id="amount"
            onChange={(event)=>dispatch({type:"amount", value:event.target.value})}
            label="Price"
            type="number"
            fullWidth
          />
          <TextField
            multiline
            margin="dense"
            value={dishData.description}
            rows="4"
            id="description"
            onChange={(event)=>dispatch({type:"description", value:event.target.value})}
            label="Description"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={adddish} color="primary">
            {
              edit ? `Update dish` : `Add dish`
            }
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
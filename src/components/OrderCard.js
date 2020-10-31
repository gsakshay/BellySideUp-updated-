import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { axiosPost, axiosDelete } from "../config/axiosClient"
import CardHeader from '@material-ui/core/CardHeader';
import Chip from '@material-ui/core/Chip';
import { getDateInRequiredFormat } from "../config/dataModifiers"
import { Context } from '../Context/ContextProvier';

const useStyles = makeStyles({
  root: {
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
});

export default function OrderCard({ order, reRenderList }) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const { dish, user } = order;

  const context = useContext(Context)
  const toast = context.Toast;

  const cancelOrder = () => {
    axiosDelete(`orders/${order.id}`, {})
      .then(res => {
        if (res.status === 200) {
          toast.dispatch({
            type: "new-toast",
            value: {
              open: true,
              severity: "success",
              message: "Your order has been deleted successfully",
              seconds: 3000,
            }
          })
          reRenderList();
        }
      }).catch(err => toast.dispatch({
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
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <CardHeader
          avatar={
            order.isDelivered ? null :
              <Chip
                label="Cancel"
                color="secondary"
                variant="outlined"
                onClick={cancelOrder}
              />
          }
          action={
            order.isDelivered ?
              <Chip
                label="Delivered"
                color="primary"
                variant="outlined"
              /> : /* <Chip
                label="Delivery In:"
                color="primary"
                variant="outlined"
                /> */ null
          }
        />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography color="primary" variant="h5" component="h2">
              {bull}Order details{bull}
            </Typography>
            <Typography variant="body2" component="p">
              <strong>Ordered On:</strong>{` ${getDateInRequiredFormat(order.createdAt)}`}
            </Typography>
            <Typography variant="body2" component="p">
              {
                order.isDelivered ? <><strong>Delevered On:</strong>{` ${getDateInRequiredFormat(order.updatedAt)}`}</> : <><strong>On the way, will be delevered soon</strong></>
              }
            </Typography>
            <Typography variant="body2" component="p">
              <strong>Delivery location:</strong>{` ${user.address}`}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography color="secondary" variant="h5" component="h2">
              {bull}Dish details{bull}
            </Typography>
            <Typography variant="body2" component="p">
              <strong>Dish:</strong>{` ${dish.name}`}
            </Typography>
            <Typography variant="body2" component="p">
              <strong>Amount:</strong>{` ${dish.price}`}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

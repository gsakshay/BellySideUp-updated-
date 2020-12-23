import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import Chip from '@material-ui/core/Chip';

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

export default function UserCard({ user }) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <CardHeader
          action={
            user.admin &&
            <Chip
              label="Admin"
              color="secondary"
              variant="outlined"
            />
          }
        />
        <h4 className="user-card-details">First Name:</h4>
        <Typography className="user-card-details" color="primary" variant="h6" component="h4">
          {`  ${user.firstName}`}
        </Typography>
        <br></br>
        <h4 className="user-card-details">Last Name:</h4>
        <Typography className="user-card-details" color="primary" variant="h6" component="h4">
          {`  ${user.lastName}`}
        </Typography>
        <br></br>
        <h4 className="user-card-details">Phone Number:</h4>
        <Typography className="user-card-details" color="primary" variant="body2" component="p">
          {`  ${user.phno}`}
        </Typography>
        <br></br>
        <h4 className="user-card-details">Address</h4>
        <Typography color="primary" variant="body2" component="p" className="user-card-details">
          {`  ${user.address}`}
        </Typography>
      </CardContent>
    </Card>
  );
}

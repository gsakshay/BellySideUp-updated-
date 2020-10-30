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

export default function UserCard({user}) {
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
        <Typography color="primary" variant="h6" component="h4">
          First Name:{`  ${user.firstName}`}
        </Typography>
        <Typography color="primary" variant="h6" component="h4">
          Last Name:{`  ${user.lastName}`}
        </Typography>
        <Typography color="primary" variant="body2" component="p">
          Phone Number:{`  ${user.phno}`}
        </Typography>
        <Typography color="primary" variant="body2" component="p">
          Address:{`  ${user.address}`}
        </Typography>
      </CardContent>
    </Card>
  );
}

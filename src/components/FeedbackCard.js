import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

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

export default function FeedbackCard({feedback}) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
          <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <Typography color="primary" variant="h5" component="h2">
                {bull}User{bull}
                </Typography>
                <Typography variant="body2" component="p">
                    <strong>Name:</strong>{` ${feedback.user.firstName} ${feedback.user.lastName}`}
                </Typography>
                <Typography variant="body2" component="p">
                    <strong>Phone Number:</strong>{` ${feedback.user.phno}`}
                </Typography>  
                <Typography variant="body2" component="p">
                    <strong>Address:</strong>{` ${feedback.user.address}`} 
                </Typography>  
              </Grid>
              <Grid item xs={12} sm={9}>
                <Typography color="secondary" variant="h5" component="h2">
                {bull}Feedback{bull}
                </Typography>
                <Typography variant="body2" component="p">
                    {feedback.feedback}
                </Typography>
              </Grid>
          </Grid>
      </CardContent>
    </Card>
  );
}

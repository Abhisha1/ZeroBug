import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

// material ui styling
const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2),
  },
}));
/**
 * A modular component that renders the loading circle whilst fetching data
 */
export default function CircularIndeterminate() {
  const classes = useStyles();

  return (
    <div>
      <CircularProgress id="progressScreen" className={classes.progress} />
    </div>
  );
}

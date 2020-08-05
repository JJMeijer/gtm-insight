import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Grid, Typography, Button, Paper } from '@material-ui/core';

/**
 * Styling
 */
const useStyles = makeStyles((theme) => ({
  errorPaper: {
    margin: theme.spacing(10),
  },
  errorElement: {
    minHeight: '40vh',
  },
}));

/**
 * Simple error component
 */
export const ErrorComponent: React.FC = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.errorPaper}>
      <Grid
        direction="column"
        justify="center"
        alignItems="center"
        container
        spacing={3}
        className={classes.errorElement}
      >
        <Grid item xs={12}>
          <Typography variant="h4">Something went wrong :(</Typography>
        </Grid>
        <Grid item xs={12}>
          <Button variant="outlined" color="secondary" onClick={() => window.location.reload()}>
            Reload
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

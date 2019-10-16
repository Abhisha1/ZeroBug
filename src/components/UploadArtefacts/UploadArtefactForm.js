import React from 'react';

import Button from '@material-ui/core/Button';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import TextField from '@material-ui/core/TextField';
import yellow from '@material-ui/core/colors/yellow';
import { makeStyles } from '@material-ui/core/styles';

// Firebase API
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

// The Primary colour for buttons and glyphs
const primary = yellow[500];

// The Initial state of al values for an upload Artefact form
const INIT_STATE = {
  artefactName: '',
  currentOwner: null,
  description: '',
  year: null,
  authFamilies:[],
  authUsers: [],
  location: '',
  date: new Date(),
};

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(100),
    padding: theme.spacing(3)

  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: primary,
  },
}));

function UploadArtefactForm(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState(INIT_STATE);
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  // Updates the values of the state on change
  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleDateChange = date => {
    setSelectedDate(date);
  };

  // Handles submission of a new created artefact to Firebase
  const onSubmit = event => {
    event.preventDefault();
  };

  // Defines when to enable the ability to upload the artefact
  const isInvalid =
    values.artefactName === '' ||
    values.location === '';

  return (
    <form onSubmit={onSubmit} noValidate className={classes.form}>
      <Grid container direction='row' justify='space-between' alignItems='center' spacing={3}>
        <Grid item xs={6} >
          <TextField
            margin="normal"
            name="artefactName"
            variant="outlined"
            required
            fullWidth
            className={classes.textField}
            id="artefactName"
            label="Artefact Name"
            autoFocus
            onChange={handleChange("artefactName")}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            margin="normal"
            name="artefactLocation"
            variant="outlined"
            required
            fullWidth
            className={classes.textField}
            id="artefactName"
            label="Place of Origin"
            autoFocus
            onChange={handleChange("location")}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
              id="outlined-multiline-static"
              label="Artefact Description"
              multiline
              fullWidth
              rows="4"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              onChange={handleChange("description")}
          />
        </Grid>
        <Grid item xs={4} >
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="dialog"
              format="dd/MM/yyyy"
              margin="normal"
              id="date-of-artefact"
              label="Date of Artefact"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
      </Grid>
      <Button
        type="submit"
        fullWidth
        onSubmit={onSubmit}
        variant="contained"
        color="primary"
        className={classes.submit}
        disabled={isInvalid}
      >
        Submit
      </Button>
    </form>

  );
}

export default withRouter(withFirebase(UploadArtefactForm));

import React from 'react';

import Button from '@material-ui/core/Button';
import CustomModal from "../../components/Modal";
import CustomSlider from '../../components/CardSlider';
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
  description: '',
  authFamilies:[],
  authUsers: [],
  location: '',
  date: new Date(),
  imageAdded: true,
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

  // add a user to the list of authUsers
  const handleModal = dataFromModal => {
    let updatedAuthUsers = values.authUsers;
    if (values.authUsers.indexOf(dataFromModal) === -1) {
      updatedAuthUsers.push({
        name: dataFromModal.displayName,
        uid: dataFromModal.uid,
        profileImage: dataFromModal.photoURL,
      });
    }
    setValues({ ...values, ["authUsers"]: updatedAuthUsers});
  }


  // Handles submission of a new created artefact to Firebase
  const onSubmit = event => {
    return event => {
      this.props.firebase.createArtefact(
        values.artefactName,
        selectedDate,
        values.location,
        values.description,
        values.authFamilies,
        values.authUsers
      )
      .then(() => {
        setValues(INIT_STATE);
        setSelectedDate(new Date());
        props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        console.error(error)
      })
      setValues(INIT_STATE);
      setSelectedDate(new Date());
      console.log("Test here");
      event.preventDefault()
    }
  };

  // Defines when to enable the ability to upload the artefact
  const isInvalid =
    values.artefactName === '' ||
    values.location === '' ||
    values.imageAdded === false;

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
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              disableFuture
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
      <Grid container justify="center">
        <Grid item>
          <CustomModal action={handleModal} />
        </Grid>
        <Grid item>
          <CustomSlider cards={values.authUsers}></CustomSlider>
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

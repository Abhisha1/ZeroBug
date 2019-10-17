import React from 'react';

import Button from '@material-ui/core/Button';
import CustomModal from "../../components/AddUserModal";
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
  const handleUsers = usersFromModal => {
    let updatedAuthUsers = values.authUsers;
    if (values.authUsers.indexOf(usersFromModal) === -1) {
      updatedAuthUsers.push({
        displayName: usersFromModal.displayName,
        uid: usersFromModal.uid,
        photoURL: usersFromModal.photoURL,
      });
    }
    setValues({ ...values, ["authUsers"]: updatedAuthUsers});
  }

  // add a family to the list of authFamilies
  const handleFamilies = familiesFromModal => {
    let updatedAuthFamilies = values.authFamilies;
    if (values.authFamilies.indexOf(familiesFromModal) === -1) {
      updatedAuthFamilies.push({
        displayName: familiesFromModal.name,
        admin: familiesFromModal.admin
      });
    }
    setValues({ ...values, ["authFamilies"]: updatedAuthFamilies});
  }

  // Handles submission of a new created artefact to Firebase
  const onSubmit = event => {
    props.firebase.createArtefact(values.artefactName, selectedDate, values.location, values.description, values.authFamilies, values.authUsers)
    .then(() => {
      setValues(INIT_STATE);
      setSelectedDate(new Date());
      props.history.push(ROUTES.HOME);
    })
    .catch(error => {
      console.error(error)
    })

    event.preventDefault()

  };

  /**
   * Function passed to child prop to search families corresponding to user input
   * @param firebase Connects to firebase server and functions
   * @param familyName User entered family name
   * @param modalState The modals current state
   */
  const searchFamilies = (firebase, familyName, modalState) => {
    firebase.searchFamilies(familyName, modalState);
  }

  /**
   * Function passed to child prop to search users corresponding to user input
   * @param firebase Connects to firebase server and functions
   * @param familyMemberName User entered user's name
   * @param modalState The modals current state
   */
  const searchForUsers = (firebase, familyMemberName, modalState) => {
    firebase.searchUsers(familyMemberName, modalState)
  }

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
        <CustomModal action={handleUsers} title="Users" search={searchForUsers}></CustomModal>
          <CustomModal action={handleFamilies} title="Families" search={searchFamilies}></CustomModal>
        </Grid>
      </Grid>
      <CustomSlider cards={values.authUsers}></CustomSlider>
      
      <CustomSlider cards={values.authFamilies}></CustomSlider>
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

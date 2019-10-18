import React from 'react';

import Button from '@material-ui/core/Button';
import CustomModal from "../AddModal";
import CustomSlider from '../../components/CardSlider';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import yellow from '@material-ui/core/colors/yellow';
import { makeStyles } from '@material-ui/core/styles';

// Firebase API
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

// The Primary colour for buttons and glyphs
const primary = yellow[900];

// The Initial state of al values for an upload Artefact form
const INIT_STATE = {
  artefactName: '',
  description: '',
  artefactBrief: '',
  authFamilies: [],
  authUsers: [],
  location: '',
  date: new Date(),
  imagesURL: [],
  imageAdded: false,
  images: [],
};

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
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

  // Update a file to upload for the artefact
  const handleFileChange = e => {
    if (e.target.files[0]) {
      const filesList = e.target.files;
      setValues({ ...values, ["images"]: filesList, ["imageAdded"]: true });
    }
  }

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
    setValues({ ...values, ["authUsers"]: updatedAuthUsers });
  }

  // add a family to the list of authFamilies
  const handleFamilies = familiesFromModal => {
    console.log(familiesFromModal);
    let updatedAuthFamilies = values.authFamilies;
    if (values.authFamilies.indexOf(familiesFromModal) === -1) {
      familiesFromModal.users.map(user => {
        handleUsers(user)
      });
      updatedAuthFamilies.push({
        displayName: familiesFromModal.displayName,
        photoURL: familiesFromModal.photoURL
      });
    }
    setValues({ ...values, ["authFamilies"]: updatedAuthFamilies });
  }

  // Handles submission of a new image for the artefact
  const onImageSubmit = event => {
    props.firebase.uploadArtefactFiles(values.images, values.artefactName, values, setValues)
      .then(() => {
        setValues({ ...values, ["images"]: [] });
      })
      .catch(error => {
        console.log("IMAGE UPLOAD FAILED")
      })

    event.preventDefault()
  };


  // Handles submission of a new created artefact to Firebase
  const onSubmit = event => {
    props.firebase.createArtefact(values.artefactName,
      selectedDate,
      values.location,
      values.artefactBrief,
      values.description,
      values.authFamilies,
      values.authUsers,
      values.imagesURL
      )
      .then(() => {
        setValues(INIT_STATE);
        setSelectedDate(new Date());
        onImageSubmit()
        .then(() => {
          props.history.push(ROUTES.HOME);
        })

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
    values.imageAdded === false ||
    values.artefactBrief === '';

  return (
    <div>
      <Grid container wrap="nowrap" justify="center">
        <CssBaseline />
        <Grid item xs={6}>
          <form onSubmit={onSubmit} noValidate className={classes.form}>
            <Grid container direction="row" justify="space-between" alignItems="center" spacing={2}>
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
            </Grid>
            <Grid container direction="row" justify="center" alignItems="center">
              <Grid item>
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
            <Grid container>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  name="artefactBrief"
                  variant="outlined"
                  required
                  fullWidth
                  className={classes.textField}
                  id="artefactBrief"
                  label="A bit about this artefact"
                  autoFocus
                  onChange={handleChange("artefactBrief")}
                />
              </Grid>
            </Grid>
            <Grid container direction="row" alignItems="center" justify="center">
              <Grid item xs={12}>
                <TextField
                  id="outlined-multiline-static"
                  label="The story behind this artefact"
                  multiline
                  fullWidth
                  rows="4"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  onChange={handleChange("description")}
                />
              </Grid>
            </Grid>
            <Grid container justify="center" spacing={3}>
              <Grid item>
                <CustomModal action={handleUsers} title="Users" search={searchForUsers} />
              </Grid>
              <Grid item>
                <CustomModal action={handleFamilies} title="Families" search={searchFamilies} />
              </Grid>
            </Grid>
            <Grid container justify="center">
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={isInvalid}
                onClick={onSubmit}
              >
                Submit
              </Button>
            </Grid>
          </form>
        </Grid>
        <Grid item xs={6}>
          <input
            id="imageUpload"
            multiple
            type="file"
            name="Upload"
            multiple
            onChange={handleFileChange}
          />
          <label htmlFor="imageUpload">
          <Button
            variant="contained"
            component="span"
          >
            UPLOAD
          </Button>
          </label>
        </Grid>
      </Grid>
      <Grid container direction="column">
        <Grid item>
          <CustomSlider cards={values.authUsers} />
        </Grid>
        <Grid item>
          <CustomSlider cards={values.authFamilies} />
        </Grid>
      </Grid>
    </div>
  );
}

export default withRouter(withFirebase(UploadArtefactForm));

import React from 'react';

import Button from '@material-ui/core/Button';
import CustomModal from "../AddModal";
import CustomSlider from '../../components/CardSlider';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography'
import yellow from '@material-ui/core/colors/yellow';
import { makeStyles } from '@material-ui/core/styles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

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

  React.useEffect(() => {
    props.firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        // Do nothing as user can access page
      } else {
        // User not logged in or has just logged out.
        props.history.push(ROUTES.SIGN_IN);
      }
    });
  });

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
    let duplicate = false
    // Checks if family exists already
    values.authFamilies.map(family => {
      if (family.displayName === familiesFromModal.displayName) {
        duplicate = true;
      }
    })
    //Adds family if it doesnt exist already
    if (!duplicate){
      updatedAuthFamilies.push({
        displayName: familiesFromModal.displayName,
        photoURL: familiesFromModal.photoURL,
        users: familiesFromModal.users
      });
      setValues({ ...values, ["authFamilies"]: updatedAuthFamilies });
    }
  }


  // Handles submission of a new created artefact to Firebase
  const onSubmit = event => {
    props.firebase.createArtefact(values.artefactName,
      selectedDate,
      values.location,
      values.artefactBrief,
      values.description,
      values.authFamilies,
      values.authUsers,
      values.images
      )
      .then(() => {
        setValues(INIT_STATE);
        setSelectedDate(new Date());
        props.history.push(ROUTES.HOME);
      }).catch(error => {
        console.log("UPLOAD FAILED");
        console.error(error);
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

  const renderImage = (image) => {
      let imageRead;
      let reader = new FileReader();

      reader.onload = function () {
        imageRead = reader.result;
      }

      if (image) {
        reader.readAsDataURL(image);
      }
      return imageRead;
  }

  // Defines when to enable the ability to upload the artefact
  const isInvalid =
    values.artefactName === '' ||
    values.location === '' ||
    values.imageAdded === false ||
    values.artefactBrief === '';

  return (
    <div>
      <Grid container wrap="nowrap" justify="center" direction="column-reverse">
        <CssBaseline />
        <Grid item justify="center">
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
                  id="newArtefactName"
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
                  id="newArtefactOrigin"
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
                    minDate = {new Date(1000, 0, 1, 1, 0, 0)}
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
        <Grid container justify="center" alignItems="center" direction="column-reverse">
          <Grid item xs={5}>
            <input
              id="imageUpload"
              multiple
              type="file"
              name="Upload"
              multiple
              accept="image/*"
              onChange={handleFileChange}
            />
            <label htmlFor="imageUpload">
              <Button
                variant="contained"
                component="span"
                fullWidth
                style={{backgroundColor: '#ffeb3b', color: 'black'}}
              >
                UPLOAD
            </Button>
            </label>
          </Grid>
          <Grid item xs={5}>
            {Array.from(values.images).map(image => (
              <Grid conatiner justify="center" alignItems="center" style={{display: 'flex',justifyItems:'center',placeContent: 'center'}}>
                <Grid item >
                  <CheckCircleIcon fontSize="large" style={{color: '#43a047',}}/>
                </Grid>
                <Grid item style={{padding: '2vw'}}>
                  <Typography>
                    {image.name}
                  </Typography>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Grid container direction="column">
        <Grid item style={{ width: "95%" }}>
          <CustomSlider cards={values.authUsers} />
        </Grid>
        <Grid item style={{ width: "95%" }}>
          <CustomSlider cards={values.authFamilies} />
        </Grid>
      </Grid>
    </div>
  );
}

export default withRouter(withFirebase(UploadArtefactForm));

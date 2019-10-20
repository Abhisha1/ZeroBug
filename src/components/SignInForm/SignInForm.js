import React from 'react';

// Material UI API
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import LockIcon from '@material-ui/icons/Lock';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import yellow from '@material-ui/core/colors/yellow';
import Chip from '@material-ui/core/Chip';
import ErrorIcon from '@material-ui/icons/Error';

// Firebase API
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

// The Initial state of all values of a signup form
const INIT_STATE = {
  email: ' ',
  password: '',
  showPassword: false,
  error: null,
};

// The Primary colour for buttons and glyphs
const primary = yellow[500];

// The styles sheet for the Material UI Element
const useStyles = makeStyles(theme => ({
  image: {
    backgroundImage: 'url(https://images.unsplash.com/photo-1504681869696-d977211a5f4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2242&q=80)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: primary,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    height: 'auto',
    marginTop: theme.spacing(1),
    padding: theme.spacing(3)

  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: primary,
  },
}));


function SignIn(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    email: '',
    password: '',
    showPassword: false,
    error: null,
  });

  React.useEffect(() => {
    props.firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        // user is already logged in redirect to home
        props.history.push(ROUTES.HOME);
      } else {
        // User not logged in or has just logged out.
      }
    });
  });

  // Updates the values of the state on change
  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  // Changes the type of the password feilds to be regural charecters
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  // Prevents default behaviour for mouse clicks to allow for password
  // visibility changing to work
  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  // Handles submission of a new created user to Firebase
  const onSubmit = event => {
    // calls authorisation to check email and password and whether it matches records in database
    props.firebase
      .doSignInWithEmailAndPassword(values.email, values.password)
      .then(() => {
        setValues({ ...INIT_STATE });
        props.history.push(ROUTES.HOME);
      })
      // Shows the error pop up when details are incorrect
      .catch(error => {
        setValues({ ...values, error: error })
      });
    event.preventDefault();
  };

  // The component to render if an error message is present
  let error;
  if (values.error !== null) {
    error = <Chip
      label={values.error.message}
      icon={<ErrorIcon />}
      color="secondary"
    />
  } else {
    error = ''
  }

  // Defines what value allocations should **DISABLE** the SIGN UP button
  const isInvalid = values.password === '' || values.email === '';

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar} align='center'>
            <LockIcon />
          </Avatar>
          <Typography component="h5" variant="h5" color='primary'>
            Log In
          </Typography>
          <form className={classes.form} noValidate onSubmit={onSubmit}>
            <TextField
              margin='normal'
              name="email"
              autoComplete="email"
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email"
              autoFocus
              onChange={handleChange("email")}
            />
            <FormControl variant='outlined' required={true} fullWidth margin='normal'>
              <InputLabel htmlFor="adornment-password" variant="outlined">Password</InputLabel>
              <OutlinedInput
                id="password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                notched
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <div align='center'>{error}</div>
            <Button
              type="submit"
              fullWidth
              onSubmit={onSubmit}
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={isInvalid}
            >
              Log In
            </Button>
            <Grid container justify="center">
              <Grid item>
                <Link href="/signup" variant="body2">
                  Don't have an account? Sign up
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
    </Grid>
  );
}

export default withRouter(withFirebase(SignIn));

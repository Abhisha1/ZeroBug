import React from 'react';
import clsx from 'clsx';
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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import CreateRoundedIcon from '@material-ui/icons/CreateRounded';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import yellow from '@material-ui/core/colors/yellow';
import { withRouter } from 'react-router-dom';
import Firebase from '../Firebase/firebase';
import * as ROUTES from '../../constants/routes';

const INIT_STATE = {
  username: '',
  email: ' ',
  password: '',
  confirmpassword: '',
  showPassword: false,
  error: null,
};

const primary = yellow[800];

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://i.pinimg.com/originals/54/3f/ac/543facb00c1e59d9bb987bd7bccfc2ac.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
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
    marginTop: theme.spacing(1),

  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: primary,
  },
}));


export default function SignUp(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    error: null,
    showPassword: false,
  });

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const onSubmit = event => {

    Firebase.doCreateUserWithEmailAndPassword(values.email, values.password).then(authUser => {
        setValues({ ...INIT_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        setValues({ error });
      })

      event.preventDefault();
  };

  const isInvalid =
    values.password !== values.confirmPassword ||
    values.password === '' ||
    values.userName === '' ||
    values.email.search(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) === -1;


  return (
    <Grid container component="main" className={classes.root} spacing={4}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>

          <Avatar className={classes.avatar} align='center'>
            <CreateRoundedIcon />
          </Avatar>

          <Typography component="h5" variant="h5" color='primary'>
            Sign Up
          </Typography>

          <form className={classes.form} noValidate onSubmit={onSubmit}>

            <Grid container spacing={2}>

              <Grid item xs={12}>
                <TextField
                  name="userName"
                  variant="outlined"
                  required={true}
                  fullWidth={true}
                  id="userName"
                  label="Name"
                  autoFocus
                  onChange={handleChange("userName")}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="email"
                  variant="outlined"
                  required={true}
                  fullWidth={true}
                  id="email"
                  label="Email"
                  autoFocus
                  onChange={handleChange("email")}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl variant='outlined' required={true} fullWidth>
                  <InputLabel htmlFor="adornment-password">Password</InputLabel>
                  <OutlinedInput
                    id="adornment-password"
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
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="adornment-password"
                  variant="outlined"
                  label="Repeat"
                  autoFocus
                  required
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.confirmPassword}
                  onChange={handleChange('confirmPassword')}
                  fullWidth
                />
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
              Sign Up
            </Button>
            <Grid container justify="center">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
            {values.error && <p>{values.error.message}</p>}
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

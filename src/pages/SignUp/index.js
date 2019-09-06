import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {FirebaseContext} from "../Firebase";
import * as ROUTES from '../../constants/routes'
//import {writeUserData} from "../Firebase/firebase"; 
//import firebase from "../Firebase";
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';

const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>
    <FirebaseContext.Consumer>
      {firebase => <SignUpForm firebase={firebase} />}
    </FirebaseContext.Consumer>  
    <SignUpForm />
  </div>
);

const INIT_STATE = {
  username: '',
  email: '',
  password: '',
  confirmpassword: '',
  error: null,
}

class SignUpFormBase extends Component {

  constructor(props) {
    super(props);
    this.state = { INIT_STATE };
  }

  onSubmit = event => {
    const {username, email, password } = this.state;

    this.props.firebase
    .doCreateUserWithEmailAndPassword(email.password)
    .then(authUser => {
      // Create a user in your Firebase realtime database
      return this.props.firebase
        .user(authUser.user.uid)
        .set({
          username,
          email,
        });
    })
    .then(() => {
      this.setState({ INIT_STATE });
      this.props.history.push(ROUTES.HOME);
    })
    .catch(error => {
      this.setState({ error });
    });
    event.preventDefault();

  };

  onChange = event => {

  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  

  render(){
    const {
      username,
      email,
      password,
      confirmpassword,
      error,
    } = this.state;

    const isInvalid =
      password !== confirmpassword ||
      password === '' ||
      email === '' ||
      username === '';
    
    // real time database call
    //this.props.firebase.database.writeUserData("629400", "Jeniiiiii", "chen@gmail.com", "12345");
    //firebase.writeUserData("629400", "Jeniiiiii", "chen@gmail.com", "12345");
    //firebase.firebase.writeUserData("629400", "Jeniiiiii", "chen@gmail.com", "12345");
   // this.props.firebase.database.writeUserData("400", "Jeniiiiii", "chen@gmail.com", "12345");


    return (
      <form onSubmit={this.onSubmit}>
        <input
            name="username"
            value={username}
            onChange={this.onChange}
            type="text"
            placeholder="Full Name"
          />
          <input
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
          />
          <input
            name="password"
            value={password}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
          />
          <input
            name="confirmpassword"
            value={confirmpassword}
            onChange={this.onChange}
            type="password"
            placeholder="Confirm Password"
          />
          <button disabled={isInvalid} type="submit">Sign Up</button>

          {error && <p>{error.message}</p>}
      </form>
    );
  }
}



const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign up now!</Link>
  </p>

);

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink};

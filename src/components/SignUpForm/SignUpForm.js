import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import "./signup.css"

import { withFirebase } from '../Firebase'
import * as ROUTES from '../../constants/routes'
import "./signupform.scss";

const INIT_STATE = {
  username: '',
  email: '',
  password: '',
  confirmpassword: '',
  error: null,
};

class SignUpFormBase extends Component {

  constructor(props) {
    super(props);
    this.state = { INIT_STATE };
  }

  onSubmit = event => {
    const { username, email, password } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {
        this.setState({ ...INIT_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      })

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
            name="confirmPassword"
            value={confirmpassword}
            onChange={this.onChange}
            type="password"
            placeholder="Confirm Password"
          />
          <button disabled={isInvalid} type="submit">
            Sign Up
          </button>

          {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignUpLink = () => (
  <p id="sign-up-link">
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default  SignUpForm;

export { SignUpLink };

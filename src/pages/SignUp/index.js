import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes'

const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>
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

class SignUpForm extends Component {

  constructor(props) {
    super(props);
    this.state = { INIT_STATE };
  }

  onSubmit = event => {

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

export default SignUpPage;

export { SignUpForm, SignUpLink};

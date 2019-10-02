import React from 'react';
import { SignUpLink } from '../../components/SignUpForm/SignUpForm';
import SignInForm from "../../components/SignInForm/SignInForm";
import "./signin.scss";

/**
 * The page that handles existing users signing in/logging in to their account
 */
const SignInPage = () => (
  <div>
    <div className="split right">
      <div className="centred">
        <h1 id="logIn">Log In</h1>
        {/* A form for users to log in using existing account details */}
        <SignInForm />
        {/* A quick link for users to sign up to a new account, if they do not have one */}
        <SignUpLink />
      </div>
    </div>
    <div className="split left">
      <div className="centered">
      </div>
    </div>
  </div>
);
export default SignInPage;
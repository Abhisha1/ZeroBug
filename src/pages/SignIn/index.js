import React from 'react';
import { SignUpLink } from '../../components/SignUpForm/SignUpForm';
import SignInForm from "../../components/SignInForm/SignInForm";
import "./signin.scss";
const SignInPage = () => (
  <div>
  <div className="split right">
    <div className="centred">
      <h1>Log In</h1>
      <SignInForm />
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
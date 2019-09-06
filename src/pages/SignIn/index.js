import React from 'react';
import { SignUpLink } from '../../components/SignUpForm/SignUpForm';
import SignInForm from "../../components/SignInForm/SignInForm";
import "./signin.scss";
const SignInPage = () => (
  <div>
  <div class="split right">
    <div class="centred">
      <h1>Log In</h1>
      <SignInForm />
      <SignUpLink />
    </div>
  </div>
  <div class="split left">
  <div class="centered">
  </div>
</div>
</div>
);
export default SignInPage;
import React from 'react';
import { SignUpLink } from '../../components/SignUpForm/SignUpForm';
import SignInForm from "../../components/SignInForm/SignInForm";
const SignInPage = () => (
  <div>
    <h1>SignIn</h1>
    <SignInForm />
    <SignUpLink />
  </div>
);
export default SignInPage;
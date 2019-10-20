import React from 'react';
import { SignUpLink } from '../../components/SignUpForm/SignUpForm';
import SignInForm from "../../components/SignInForm/SignInForm";
import Grid from '@material-ui/core/Grid';
import "./signin.scss";

/**
 * The page that handles existing users signing in/logging in to their account
 */
const SignInPage = () => (
  <SignInForm />
);
export default SignInPage;

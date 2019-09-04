import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SignUpForm  from '../../components/SignUpForm/SignUpForm'

import { withFirebase } from '../Firebase'

import * as ROUTES from '../../constants/routes'

const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm />
  </div>
);


export default SignUpPage;
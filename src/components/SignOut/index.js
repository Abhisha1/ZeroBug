import React from 'react';
import { withFirebase } from '../Firebase';
import '../Button/button.scss';
const SignOutButton = ({ firebase }) => (
  <button type="button" variant="primary" onClick={firebase.doSignOut}>
    Sign Out
  </button>
);
export default withFirebase(SignOutButton);

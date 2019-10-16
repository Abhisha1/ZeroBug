import React from 'react';
import { withFirebase } from '../Firebase';
import Button from "@material-ui/core/Button";
import "./signout.scss";
const SignOutButton = ({ firebase }) => (
  <Button variant="outlined" id="signOut" onClick={firebase.doSignOut}>
    Sign Out
  </Button>
);
export default withFirebase(SignOutButton);

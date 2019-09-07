import React, { Component } from 'react';

import { Link, withRouter } from 'react-router-dom';
import {FirebaseContext} from "../Firebase";
import FirebaseMain from "../Firebase/firebase";
import firebase from 'firebase';
import SignUpForm  from '../../components/SignUpForm/SignUpForm'

import { withFirebase } from '../Firebase'

import * as ROUTES from '../../constants/routes'
import { compose } from 'recompose';

/*
let testUpload = (ba) => {
  ba.database().ref('testUploadsJen/' + "testOne").set({
    name: "lolol",
    pease: "testing about the uploading job yoo"
  }, (error) => {
    if (error) {
      // The write failed...
        console.log("Written data FAILED");
    } else {
        // Data saved successfully!
        console.log("Successfully append the data!");
    }
  });
}
*/


const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>
    <FirebaseContext.Consumer>
      {firebase => [
        <div>
          <SignUpForm firebase={firebase} />
          <button onClick={() => firebase.testUploadArtifactData("06","Family Photo6",  "Australia6", "Jen6", "Testing about the uploading job6")}>
            click to upload the test artifact data</button>
          <button onClick={() => firebase.testUpdateArtifactData("06", "update name", "update origin", "update owner", "update description")}>
            click to update the test artifact data</button>
          <button onClick={() => firebase.testUpdateArtifactData("06", null, null, null, null)}>
            click to delete the test artifact data</button>
        </div>

      ]}
    </FirebaseContext.Consumer>  
  
  </div>
);

export default SignUpPage;
import React, { Component } from 'react';

import { Link, withRouter } from 'react-router-dom';
import {FirebaseContext} from "../Firebase";
import FirebaseMain from "../Firebase/firebase";
import firebase from 'firebase';
import SignUpForm  from '../../components/SignUpForm/SignUpForm'

import { withFirebase } from '../Firebase'

import * as ROUTES from '../../constants/routes'
import { compose } from 'recompose';


class SignUpPage extends Component{
  state = {
    artifactName: "No Artifact Name",
  }

  render() {
    return (<div>
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
            <p id  = "artifactInfo">{this.state.artifactName}</p>

            <button onClick={()=>firebase.getArtifactData("05", this)}>Click me to show the artifact Information</button>
          </div>
 
        ]}
      </FirebaseContext.Consumer>  
    </div>)
  }
}

export default SignUpPage;
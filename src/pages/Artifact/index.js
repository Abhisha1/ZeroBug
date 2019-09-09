import React, { Component } from 'react';
import {FirebaseContext} from "../Firebase";




class Artifact extends Component{
    state = {
      artifactName: "No Artifact Name",
    }
  
    render() {
      return (<div>
       
        <FirebaseContext.Consumer>
          {firebase => [
            <div>
              <button onClick={() => firebase.testUploadArtifactData("08","Family Photo8",  "Australia8", "Jen8", "Testing about the uploading job8")}>
                click to upload the test artifact data</button>
              <button onClick={() => firebase.testUpdateArtifactData("07", "update name", "update origin", "update owner", "update description")}>
                click to update the test artifact data</button>
              <button onClick={() => firebase.testUpdateArtifactData("07", null, null, null, null)}>
                click to delete the test artifact data</button>
              <p id  = "artifactInfo">{this.state.artifactName}</p>
  
              <button onClick={()=>firebase.getArtifactData("05", this)}>Click me to show the artifact Information</button>
            </div>
   
          ]}
        </FirebaseContext.Consumer>  
      </div>)
    }
  }


export default Artifact;
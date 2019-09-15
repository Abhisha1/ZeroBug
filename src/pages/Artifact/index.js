import React, { Component } from 'react';
import {FirebaseContext} from "../Firebase";

// some problem occurs when import the firebase from components
// but fine if the firebase is under the page folder
// import {FirebaseContext} from "../../components/Firebase";


class Artifact extends Component{
  state = {
    artifactName: "No Artifact Name",
    artifactList: null,
    one: '',
  }

  render() {
    return (<div>
     
      <FirebaseContext.Consumer>
        {firebase => [
          <div>
            <button onClick={() => firebase.testUploadArtifactData("09","Family Photo9",  "Australia9", "Jen9", "Testing about the uploading job9")}>
              click to upload the test artifact data</button>
            <button onClick={() => firebase.testUpdateArtifactData("07", "update name", "update origin", "update owner", "update description")}>
              click to update the test artifact data</button>
            <button onClick={() => firebase.testUpdateArtifactData("07", null, null, null, null)}>
              click to delete the test artifact data</button>
            
            <button onClick={()=>firebase.getArtifactData("05", this)}>click me to show the artifact Information</button>
            <p id  = "artifactInfo">{this.state.artifactName}</p>

            <button onClick={() => firebase.getListArtifactName(this)}>click me to get a list of Artifacts' Names from the database</button>
            <ul>
              {(this.state.artifactList || []).map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>

          </div>
 
        ]}
      </FirebaseContext.Consumer>  
    </div>)
  }
}



export default Artifact;
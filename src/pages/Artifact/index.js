import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase'

// some problem occurs when import the firebase from components
// but fine if the firebase is under the page folder
// import {FirebaseContext} from "../../components/Firebase";


class Artifact extends Component{

  constructor(props) {
    super(props);
    this.state = {
      artifactName: "No Artifact Name",
      artifactList: null,
      artifactSortedList: null,
      topFive: null,
    };
  }

  componentDidMount(){
    alert(this.props.firebase);
  }

  render() {

    return (<div>
     
          <div>
            <button onClick={() => this.props.firebase.testUploadArtifactData("09","Family Photo9",  "Australia9", "Jen9", "Testing about the uploading job9")}>
              click to upload the test artifact data</button>
            <button onClick={() => this.props.firebase.testUpdateArtifactData("07", "update name", "update origin", "update owner", "update description")}>
              click to update the test artifact data</button>
            <button onClick={() => this.props.firebase.testUpdateArtifactData("07", null, null, null, null)}>
              click to delete the test artifact data</button>
            
            <button onClick={()=>this.props.firebase.getArtifactData("05", this)}>click me to show the artifact Information</button>
            <p id  = "artifactInfo">{this.state.artifactName}</p>

            <button onClick={() => this.props.firebase.getListArtifactName(this)}>click me to get a list of Artifacts' Names from the database</button>
            <ul>
              {(this.state.artifactList || []).map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <button onClick={() => this.props.firebase.getSortedListArtifactName(this)}>click me to get a SORTED list of Artifacts' Names from the database</button>
            <ul>
              {(this.state.artifactSortedList || []).map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            
            <button onClick={() => this.firebase.getTopFiveArtifactName(this)}>click me to get TOP 5 Artifacts' Names order by the artifactName from the database</button>
            <ul>
              {(this.state.topFive || []).map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>


          </div>
 
        ]}
      
    </div>)
  }
}



export default (withFirebase(Artifact));
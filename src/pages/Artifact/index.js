import React, { Component } from 'react';
import {FirebaseContext} from "../../components/Firebase";
import { withAuthorization } from "../../components/Session";

import ImageUpload from "./imageUpload"

class Artifact extends Component{
  state = {
    artifactName: "No Artifact Name",
    artifactList: null,
    artifactSortedList: null,
    topFive: null,
    imageURL: null,
    listFileNames: null,
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

            <button onClick={() => firebase.getSortedListArtifactName(this)}>click me to get a SORTED list of Artifacts' Names from the database</button>
            <ul>
              {(this.state.artifactSortedList || []).map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <button onClick={() => firebase.getTopFiveArtifactName(this)}>click me to get TOP 5 Artifacts' Names order by the artifactName from the database</button>
            <ul>
              {(this.state.topFive || []).map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>


            <div>
            <ImageUpload />
            </div>

            <button onClick={() => firebase.testDownloadFile(this,'images/aaa.png')}>
              click to download the image</button>
            <img src={this.state.imageURL} style={{width: 680, height: 360}}/>


            <button onClick={() => firebase.testDeleteFile(this,'images/'+'Web 1920 – 3.png')}>
              click to delete the image</button>


            <button onClick={() => firebase.testGetListOfFileNames(this)}>
            click to get the list of files</button>


            <ul>
            {(this.state.listFileNames || []).map(item => (
              <li key={item}>{item}</li>
            ))}
            </ul>


            {/*<button onClick={() => firebase.testPutFilePathToDB('images/aaa.png')}>
            click to store file storage URL to Database</button>*/}

          </div>

        ]}
      </FirebaseContext.Consumer>
    </div>)
  }
}


const condition = authUser => !!authUser;
export default withAuthorization(condition)(Artifact);

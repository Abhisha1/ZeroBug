import app from 'firebase/app';
import 'firebase/auth';
import firebase from 'firebase';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.database = firebase.database;
  }





  // write data to the database
  testUploadArtifactData = (artifactID, artifactName, artifactOrigin, artifactCurrentOwner, artifactDescription) => {
    this.database().ref('testUploadArtifactData/' + artifactID).set({
      artifactName: artifactName,
      origin: artifactOrigin,
      currentOwner: artifactCurrentOwner,
      description: artifactDescription
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

  // write to the database with generated random key
  // not use at the moment
  testUpdateArtifactData2 = () => {
    // Create a new post reference with an auto-generated id
    var newPostRef = this.database().ref('/testUploadArtifactData/').push();
    //console.log(newPostRef);
    newPostRef.set({
      artifactName : "test3",
      origin : "test3",
      currentOwner : "test3",
      description : "test3"
    });
  }

  // update or delete the data
  testUpdateArtifactData = (updateArtifactID, updateArtifactName, updateArtifactOrigin, updateCurrentOwner, updateDescription) => {
    
    // A post entry
    var postData = {
      artifactName : updateArtifactName,
      origin : updateArtifactOrigin,
      currentOwner : updateCurrentOwner,
      description : updateDescription
    };

    var updates = {};
    updates['/testUploadArtifactData/' + updateArtifactID] = postData;

    return firebase.database().ref().update(updates);
  }


  // get the artifact data
  getArtifactData = (artifactID, the) => {
    let artifactName = "?";
    this.database().ref('/testUploadArtifactData/05' + "").once('value').then(function(snapshot) {
      artifactName= (snapshot.val() && snapshot.val().artifactName) || 'Anonymous';
      the.setState({... the.state, artifactName: artifactName})
    })
  }

  // get a list of Artifact name data
  getListArtifactName = (the) => {
    var testArtifactName = [];
    var tempRef = this.database().ref('/testUploadArtifactData/');
    tempRef.on('child_added', function(data) {      
      testArtifactName.push(data.val().artifactName);
    });
    the.setState({... the.state, artifactList: testArtifactName})
  }


   // get a sorted list of Artifact name data by their name
   getSortedListArtifactName = (the) => {
    var testSortedArtifactName = [];
    var tempRef = this.database().ref('/testUploadArtifactData/').orderByChild('artifactName');
    tempRef.on('child_added', function(data) {      
      testSortedArtifactName.push(data.val().artifactName);
    });
    the.setState({... the.state, artifactSortedList: testSortedArtifactName})
  }

  
  // get top 5 Artifact name data order by ArtifactName
  getTopFiveArtifactName = (the) => {
    var topFiveArtifactName = [];
    var tempRef = this.database().ref('/testUploadArtifactData/').orderByChild('artifactName').limitToFirst(5);
    tempRef.on('child_added', function(data) {      
      topFiveArtifactName.push(data.val().artifactName);
    });
    the.setState({... the.state, topFive: topFiveArtifactName})
  }


   
   



  // Autherisation API
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);
    

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  
  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);
}

export default Firebase;
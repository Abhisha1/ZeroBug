import app from 'firebase/app';
import 'firebase/auth';
import firebase from 'firebase';
import * as MESSAGES from '../../constants/messages';

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
  updateUsers = (name, email) => {

    this.database().ref('users/' + name).set({
      name: name,
      email: email
    }).then(() => {
      return MESSAGES.SUCCESS_MESSAGE;
    }).catch(error => {
      return error;
    })
  }

  /**
   * Finds whether the user exists and sends users which match, back to parent class
   * @param user the input string for a user
   * @param the the parent class
   * @return a success message when successful, or an error
   */
  searchUsers = (user, the) => {
    let searchedUsers = []
    let dbRef = this.database().ref('/users/');
    dbRef.on("value", function (snapshot) {
      if (snapshot.val() == null) {
        return new Error("no matches");
      }
      else {
        for (let key in snapshot.val()) {
          // checks if the sanitised names of input and database match
          if (snapshot.val()[key].name.toLowerCase().includes(user.toLowerCase())) {
            searchedUsers.push(snapshot.val()[key]);
          }
        }
        // sends matched users data back to parent class
        the.setState({ ...the.state, searchedUsers: searchedUsers });
        return MESSAGES.SUCCESS_MESSAGE;
      }

    })
  }

  /**
   * Finds if a family exists with the specified name already
   * @param name The family name to be checked with database
   * @return A boolean indicating if that family name already exists
   */
  isExistingFamily = (name) => {
    let dbRef = this.database().ref('/families/');
    let isMatch = false
    dbRef.on("value", function (snapshot) {
      if (snapshot.val() != null) {
        for (let key in snapshot.val()) {

          // Checks if sanitised family name exists in database
          if (key.toLowerCase() === name.toLowerCase()) {
            isMatch = true;
          }

        }
      }
    })
    return isMatch;
  }

  /**
   * Retrieves the a particular families' data
   * @param name The family name
   * @return The associated family's data or an error
   */
  viewFamily = (name) => {
    return new Promise((resolve, reject) => {
      const onData = snap =>{
        resolve(snap.val());
      } 
      const onError = error => reject(error);
      this.database().ref('/families/' + name).on("value", onData, onError)
    });
}
  /**
   * Creates a new family and uploads to database
   * @param users The family members
   * @param name The family name
   * @param admin The family group's admin; has privileges
   * @return A success message or error
   */
  createFamily = (users, name, admin) => {
    return (
      this.database().ref('families/' + name).set({
        users: users,
        name: name,
        admin: admin
      }).then(() => {
        return MESSAGES.SUCCESS_MESSAGE;
      }).catch(error => {
        return error;
      })
    )
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
      artifactName: "test3",
      origin: "test3",
      currentOwner: "test3",
      description: "test3"
    });
  }

  // update or delete the data
  testUpdateArtifactData = (updateArtifactID, updateArtifactName, updateArtifactOrigin, updateCurrentOwner, updateDescription) => {

    // A post entry
    var postData = {
      artifactName: updateArtifactName,
      origin: updateArtifactOrigin,
      currentOwner: updateCurrentOwner,
      description: updateDescription
    };

    var updates = {};
    updates['/testUploadArtifactData/' + updateArtifactID] = postData;

    return firebase.database().ref().update(updates);
  }


  // get the artifact data
  getArtifactData = (artifactID, the) => {
    let artifactName = "?";
    this.database().ref('/testUploadArtifactData/05' + "").once('value').then(function (snapshot) {
      artifactName = (snapshot.val() && snapshot.val().artifactName) || 'Anonymous';
      the.setState({ ...the.state, artifactName: artifactName })
    })
  }

  // get a list of Artifact name data
  getListArtifactName = (the) => {
    var testArtifactName = [];
    var tempRef = this.database().ref('/testUploadArtifactData/');
    tempRef.on('child_added', function (data) {
      testArtifactName.push(data.val().artifactName);
    });
    the.setState({ ...the.state, artifactList: testArtifactName })
  }


  // get a sorted list of Artifact name data by their name
  getSortedListArtifactName = (the) => {
    var testSortedArtifactName = [];
    var tempRef = this.database().ref('/testUploadArtifactData/').orderByChild('artifactName');
    tempRef.on('child_added', function (data) {
      testSortedArtifactName.push(data.val().artifactName);
    });
    the.setState({ ...the.state, artifactSortedList: testSortedArtifactName })
  }


  // get top 5 Artifact name data order by ArtifactName
  getTopFiveArtifactName = (the) => {
    var topFiveArtifactName = [];
    var tempRef = this.database().ref('/testUploadArtifactData/').orderByChild('artifactName').limitToFirst(5);
    tempRef.on('child_added', function (data) {
      topFiveArtifactName.push(data.val().artifactName);
    });
    the.setState({ ...the.state, topFive: topFiveArtifactName })
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

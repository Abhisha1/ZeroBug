import app from 'firebase/app';
import 'firebase/auth';
import firebase from 'firebase';
import * as MESSAGES from '../../constants/messages';
import cookie from 'js-cookie';




const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

const axios = require("axios");

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.database = firebase.database;
    this.storage = firebase.storage;
  }

  //download the file from the storage
  testDownloadFile = (the, filepath) => {
    this.storage().ref().child(filepath).getDownloadURL().then(function (url) {
      the.setState({ ...the.state, imageURL: url })
    }).catch(function (error) {
      // ...
    });
  }

  /********************************************************************** */
  //upload the user profile images
  //used by the pages/Account/imageUpload.js
  uploadProfileImage = (image, th, location, dbGroupName) => {
    this.storage().ref().child(location + image.name).put(image).then((snapshot) => {
      this.getProfileImageURL(th, location, location + image.name, dbGroupName);
      console.log('success uploading');
    }).catch(error => {
      console.log("Written data FAILED");
    });
  }

  //store the file path of the storage to the database
  putProfileImageFilePathToDB = (filepath, location, username) => {
    var newPostRef = this.database().ref('/' + location).push();

    newPostRef.set({
      fileURL: filepath,
      username: username,

    })
      .then(() => {
        console.log("success putting");
      }).catch(error => {
        console.log("Written data FAILED");
      });
  }

  //get the image file path that store in the firebase storage
  getProfileImageURL = (th, location, filepath, dbGroupName) => {
    this.storage().ref().child(filepath).getDownloadURL().then((url) => {

      th.setState({ ...th.state, imageURL: url, isUploaded: true });
      this.putProfileImageFilePathToDB(url, location, dbGroupName);

    }).catch(error => {
      console.log("Written data FAILED");
    });
  }

  /********************************************************************** */

  // get a list of Artifact name data
  getListArtifactName = (the) => {
    var testArtifactName = [];
    var tempRef = this.database().ref('/testUploadArtifactData/');
    tempRef.on('child_added', (data) => {
      testArtifactName.push(data.val().artifactName);
      the.setState({ ...the.state, artifactList: testArtifactName })
    });
  }


  // get a list of Family name data
  getListFamilyName = (the) => {
    var testFamilyName = [];
    var tempRef = this.database().ref('/families/');
    tempRef.on("value", (data) => {

      for (let key in data.val()) {

        for (let user in data.val()[key].users) {

          //here just for Jessica Text
          if (data.val()[key].users[user].name == "Jessica Test") {
            testFamilyName.push(data.val()[key].name);

          }
        }
      }

      the.setState({ ...the.state, familyList: testFamilyName })
    });
  }






  //upload the files
  //used by the pages/Artifact/imageUpload.js
  uploadthings = (image, th) => {
    // var aaa = this.storage().ref().child('images/'+image.name).put(image);
    var aaa = this.storage().ref().child('images/' + image.name).put(image).then((snapshot) => {
      this.getURL(th, 'images/' + image.name);
    }
    );
  }

  //delete the file
  testDeleteFile = (the, filepath) => {
    var desertRef = this.storage().ref().child(filepath);

    desertRef.delete().then(function () {
      console.log("delete the file");
    }).catch(function (error) {
    });
  }

  //get a list of storage files Names
  testGetListOfFileNames = (the) => {
    // Create a reference under which you want to list
    var listRef = this.storage().ref().child('images');

    listRef.listAll().then(function (res) {
      var fileNames = [];
      var i;

      for (i = 0; i < res.items.length; i++) {
        fileNames.push(res.items[i].name);

      }
      the.setState({ ...the.state, listFileNames: fileNames })
    }).catch(function (error) {
      // ...
    });
  }

  //store the file path of the storage to the database
  testPutFilePathToDB = (filepath) => {
    console.log(filepath);
    var newPostRef = this.database().ref('/filesURL/').push();
    console.log(newPostRef);

    newPostRef.set({
      fileURL: filepath,
    });


  }

  //get the image file path that store in the firebase storage
  getURL = (th, filepath) => {
    this.storage().ref().child(filepath).getDownloadURL().then((url) => {
      console.log("aaaaa");
      console.log(url);

      th.setState({ ...th.state, imageURL: url });

      console.log("test test");
      this.testPutFilePathToDB(url);
      console.log(url);

      //return url;
    }).catch(function (error) {
      // ...
    });
  }

  /**
   * Finds whether the user exists and sends users which match, back to parent class
   * @param user the input string for a user
   * @param the the parent class
   * @return a success message when successful, or an error
   */
  searchUsers = (user, the) => {
    console.log(user);
    // Calls API to fetch all users that match the name
    axios.post("https://boiling-castle-30087.herokuapp.com/api/getAllUsers", {
      name: user
    })
      .then(response => {
        console.log(response);
        if (response.data.msg === "Success") {
          the.setState({ ...the.state, searchedUsers: response.data.users, loading: false });
        }
        if(response.data.msg === "No matches"){
          the.setState({ ...the.state, noMatches: true, loading:false})
        }
      })
      .catch(error => {
        return new Error(error.data.msg);
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
    let dbRef = this.database().ref('/families/' + name);
    dbRef.on("value", function (snapshot) {
      if (snapshot.val() == null) {
        return new Error("Could not retrieve this family");
      }
      else {
        return snapshot.val();
      }
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

  /**
   * Create a new artefact
   */
  createArtefact = (name, date, location, description, authFamilies, authUsers) => {
    let currentUser = this.auth.currentUser;
    return (
      this.database().ref('artefacts/' + name).set({
        date: date,
        location: location,
        description: description,
        authFamilies: authFamilies,
        authUsers: authUsers,
        owner: {
          email: currentUser.email,
          name: currentUser.displayName,
          uid: currentUser.uid,
        }
      }).then(() => {
        return MESSAGES.SUCCESS_MESSAGE;
      }).catch(error => {
        return error;
      })
    )
  }


  /**
   * write to the database with generated random key
   */
  testUpdateArtifactData2 = () => {
    // Create a new post reference with an auto-generated id
    var newPostRef = this.database().ref('/testUploadArtifactData/').push();

    newPostRef.set({
      artifactName: "test3",
      origin: "test3",
      currentOwner: "test3",
      description: "test3"
    });
  }


  /**
   * update or delete the artifact data
   * @param updated artifact ID
   * @param updated artifact name
   * @param updated artifact origin
   * @param updated artifact current owner
   * @param updated artifact description
   */
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


  /**
   * get the artifact data
   * @param artifact ID
   * @param the component to be set the state
   */
  getArtifactData = (artifactID, the) => {
    let artifactName = "?";
    this.database().ref('/testUploadArtifactData/05' + "").once('value').then(function (snapshot) {
      artifactName = (snapshot.val() && snapshot.val().artifactName) || 'Anonymous';
      the.setState({ ...the.state, artifactName: artifactName })
    })
  }


  /**
   * Get a list of Artifact name data
   * @param the component to be set the state
   */
  getListArtifactName = (the) => {
    var testArtifactName = [];
    var tempRef = this.database().ref('/testUploadArtifactData/');
    tempRef.on('child_added', function (data) {
      testArtifactName.push(data.val().artifactName);
    });
    the.setState({ ...the.state, artifactList: testArtifactName })
  }


  /**
   * Get a sorted list of Artifact name data by their name
   * @param the component to be set the state
   */
  getSortedListArtifactName = (the) => {
    var testSortedArtifactName = [];
    var tempRef = this.database().ref('/testUploadArtifactData/').orderByChild('artifactName');
    tempRef.on('child_added', function (data) {
      testSortedArtifactName.push(data.val().artifactName);
    });
    the.setState({ ...the.state, artifactSortedList: testSortedArtifactName })
  }


  /**
   * Get top 5 Artifact name data order by ArtifactName
   * @param the component to be set the state
   */
  getTopFiveArtifactName = (the) => {
    var topFiveArtifactName = [];
    var tempRef = this.database().ref('/testUploadArtifactData/').orderByChild('artifactName').limitToFirst(5);
    tempRef.on('child_added', function (data) {
      topFiveArtifactName.push(data.val().artifactName);
    });
    the.setState({ ...the.state, topFive: topFiveArtifactName })
  }


  /**
   * Sign up a user using their provided email and password
   * @param email the email address of the user to register by
   * @param password the password for the user to register by
   * @param username the username for the new user
   */
  doCreateUserWithEmailAndPassword = (email, password, username) => {
    // Create the new user in Firebase
    return this.auth.createUserWithEmailAndPassword(email, password);
  }



  /**
   * Sign in the a registered user account
   * @param email the email address of the registered user
   * @param password the password for the registered user's account
   */
  doSignInWithEmailAndPassword = (email, password) => {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);
}

export default Firebase;

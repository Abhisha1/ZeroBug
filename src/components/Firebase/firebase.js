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
    this.storage = firebase.storage;
  }

  //download the file from the storage
  testDownloadFile  = (the, filepath) => {
    this.storage().ref().child(filepath).getDownloadURL().then(function(url) {
      the.setState({... the.state, imageURL: url})
    }).catch(function(error) {
      // ...
    });
  }
  // write data to the database
  updateUsers = (name, email) => {

    this.database().ref('users/' + name).set({
      name: name,
      email: email
    }).then( () => {
      return MESSAGES.SUCCESS_MESSAGE;
    }).catch( error => {
        // The write failed...
          console.log("Written data FAILED");
      
    })
  }


  //upload the files
  //used by the pages/Artifact/imageUpload.js
  uploadthings = (image, th) => {
   // var aaa = this.storage().ref().child('images/'+image.name).put(image);
    var aaa = this.storage().ref().child('images/'+image.name).put(image).then((snapshot) => {
      this.getURL(th, 'images/'+image.name);
    }

    );
    //console.log(aaa);
  }

  //delete the file
  testDeleteFile = (the, filepath) => {
    var desertRef = this.storage().ref().child(filepath);

    desertRef.delete().then(function() {
      console.log("delete the file");
    }).catch(function(error) {
      // ...
    });
  }

  //get a list of storage files Names
  testGetListOfFileNames = (the) => {
    // Create a reference under which you want to list
    var listRef = this.storage().ref().child('images');

    listRef.listAll().then(function(res) {
      var fileNames = [];
      var i;

      for(i=0; i<res.items.length; i++){
        fileNames.push(res.items[i].name);

      }
      the.setState({... the.state, listFileNames: fileNames})
    }).catch(function(error) {
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
      
      th.setState({... th.state, imageURL: url});

      console.log("test test");
      this.testPutFilePathToDB(url);
      console.log(url);
      
      //return url;
    }).catch(function(error) {
      // ...
    });
  }

  
  searchUsers = (user, the) => {
    let searchedUsers = []
    let dbRef = this.database().ref('/users/');
    dbRef.on("value", function(snapshot){
      if (snapshot.val() == null){
        return new Error("no matches");
      }
      else{
        
        for (let key in snapshot.val()){
          if (snapshot.val()[key].name.toLowerCase().includes(user.toLowerCase())){
            searchedUsers.push(snapshot.val()[key]);
          }
        }
        the.setState({... the.state, searchedUsers: searchedUsers});
        return MESSAGES.SUCCESS_MESSAGE;
      }
      
    })
  }

  createFamily = (users, name, admin) => {
    return (
    this.database().ref('families/'+ name).set({
      users: users,
      name: name,
      admin: admin
    }).then( () => {
      console.log(MESSAGES.SUCCESS_MESSAGE);
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

import app from 'firebase/app';
import 'firebase/auth';
import firebase from 'firebase';
//import 'firebase/database';

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
    
   // this.db = app.database();

    /*this.userId = "02";
    firebase.database().ref('/users/' + this.userId).once('value').then(function(snapshot) {
      var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
      var email = (snapshot.val() && snapshot.val().email) || 'Anonymous';
      var password = (snapshot.val() && snapshot.val().password) || 'Anonymous';
      console.log(username);
      console.log(email);
      console.log(password);
  })*/
  }

  // write data to the database
  writeUserData = (userId, name, email, pwd) => {
      //firebase.database().ref('users/' + userId).set({
        firebase.database().ref('users/' + userId).set({
          username: name,
          email: email,
          password : pwd

      // add a completion callback    
      }, function(error) {
          if (error) {
              // The write failed...
              console.log("Written data FAILED");

          } else {
              // Data saved successfully!
              console.log(name, email, pwd)
              console.log("Successfully append the data!");

          }
      });
  }

  testUpload = () => {
    this.database().ref('testUploadsJen/' + "testOne").set({
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



  //writeUserData("HYvnIcgGjn1uLDzg51Pm", "Jen", "chen@gmail.com", "123");
  //writeUserData("04", "Jen", "chen@gmail.com", "123");

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

//export default {writeUserData};
export default Firebase;
//export {writeUserData};

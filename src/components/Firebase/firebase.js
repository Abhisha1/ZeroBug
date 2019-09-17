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
  updateUsers = (name, email) => {
    var newPostKey = firebase.database().ref().child('users').push().key;

    this.database().ref('users/' + newPostKey).set({
      name: name,
      email: email
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

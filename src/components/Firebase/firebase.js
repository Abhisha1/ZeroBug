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

  /**
   * Uploads the artefact to the server storage, using a specified location folder under the groups name (family name or user's name)
   * @param image the image to be uploaded
   * @param the the state of the parent class invoking the upload
   * @param location the folder under which the image file should be stored on server
   * @param dbGroupName the name of the group under which the image belongs to; ie the family name or user's name
   */
  uploadPlaceholderImage = (imageString, location, dbGroupName) => {
    this.storage().ref().child(location + dbGroupName).putString(imageString)
      .then(snapshot => {
        console.log(snapshot);
        this.storage().ref().child(location + dbGroupName).updateMetadata({ contentType: 'image/png' })
      })


  }

  /**
   * Uploads the artefact to the server storage, using a specified location folder under the groups name (family name or user's name)
   * @param image the image to be uploaded
   * @param the the state of the parent class invoking the upload
   * @param location the folder under which the image file should be stored on server
   * @param dbGroupName the name of the group under which the image belongs to; ie the family name or user's name
   */
  uploadProfileImage = (image, th, location, dbGroupName) => {

    this.storage().ref().child(location + dbGroupName).put(image).then((snapshot) => {
      this.getProfileImageURL(th, location, location + dbGroupName, dbGroupName);
      console.log('success uploading');
    }).catch(error => {
      console.log("Written data FAILED");
    });
  }


  /**
   * Stores the url and name of the group the image belongs to in the database
   * @param filepath the filepath of the image in server
   * @param location the folder under which the image file should be stored on server
   * @param dbGroupName the name of the group under which the image belongs to; ie the family name or user's name
   */
  putProfileImageFilePathToDB = (filepath, location, dbGroupName) => {

    var newPostRef = this.database().ref('/' + location).push();

    newPostRef.set({
      fileURL: filepath,
      username: dbGroupName,


    })
      .then(() => {
        console.log("success putting");
      }).catch(error => {
        console.log("Written data FAILED");
      });
  }

  /**
   * Updates preview to new image
   * @param image the image to be uploaded
   * @param the the state of the parent class invoking the upload
   * @param location the folder under which the image file should be stored on server
   * @param dbGroupName the name of the group under which the image belongs to; ie the family name or user's name
   */
  getProfileImageURL = (th, location, filepath, dbGroupName) => {
    this.storage().ref().child(filepath).getDownloadURL().then((url) => {

      th.setState({ ...th.state, imageURL: url, isUploaded: true });

      // If the image being uploaded to is an artefact, we store it in the realtime database
      if (dbGroupName === "/artefactImages") {
        this.putProfileImageFilePathToDB(url, location, dbGroupName);
      }


    }).catch(error => {
      console.log("Written data FAILED");
    });
  }

  /********************************************************************** */
  /**
   * get the profile image before rendering the account page
   * @para the component to be set the state
   * @para the filepath
   * @para the username
   */
  getImageURL = (th, location, dbGroupName) => {

    this.storage().ref().child(location + dbGroupName).getDownloadURL().then((url) => {


      th.setState({ ...th.state, imageURL: url });
    }).catch(error => {
      console.log("Show data FAILED");
    });

  }


  /**
   * get the list fo families images
   * @para the component to be set the state
   * @para the filepath
   * @para the list of families names
   */
  findImage = (location, name) => {
    return new Promise((resolve, reject) => {
      this.storage().ref().child('/' + location + name).getDownloadURL()
        .then(url => {
          resolve(url);
        })
        .catch(error => {
          reject(error);
        })
    })
  }
  getFamiliesImageURL = (th, location, familyNamesList) => {
    let familyImages = [];

    for (var i = 0; i < familyNamesList.length; i++) {

      this.storage().ref().child(location + familyNamesList[i]).getDownloadURL().then((url) => {

        familyImages.push(url);
        th.setState({ ...th.state, familyImageURL: familyImages });
      })
    }

  }






  // get a list of Artifact name data
  getListArtifactName = (the) => {
    let testArtifactName = [];
    let tempRef = this.database().ref('/testUploadArtifactData/');
    tempRef.on('child_added', (data) => {
      testArtifactName.push(data.val().artifactName);
      the.setState({ ...the.state, artifactList: testArtifactName })
    });
  }


  // for home page
  /**
   * get a list of Family name that the user have
   * @para the component to be set the state
   * @para users' names
   */
  getListFamilyName = (the, username) => {
    var testFamilyName = [];
    var tempRef = this.database().ref('/families/');
    tempRef.on("value", (data) => {

      for (let key in data.val()) {

        for (let user in data.val()[key].users) {
          if (data.val()[key].users[user].displayName == username) {

            testFamilyName.push(data.val()[key].name);

          }
        }
      }

      the.setState({ ...the.state, familyList: testFamilyName })

    });
  }

  //for account pages
  /**
   * get the family that you managed
   * @para the component to be set the state
   * @para the user name
   */
  getYourManagedFamilyName = (the, username) => {
    let testFamilyName = [];
    let tempRef = this.database().ref('/families/');
    tempRef.on("value", (data) => {

      for (let key in data.val()) {
        if (data.val()[key].admin.name == username) {
          testFamilyName.push(data.val()[key].name);

        }
      }
      the.setState({ ...the.state, familyList: testFamilyName });
      this.getFamiliesImageURL(the, "familyImages/", testFamilyName);
      the.setState({ dataReady: true })
    })

  }


  //upload the files
  //used by the pages/Artifact/imageUpload.js
  uploadthings = (image, th) => {
    // var aaa = this.storage().ref().child('images/'+image.name).put(image);
    var aaa = this.storage().ref().child('images/' + image.name).put(image).then((snapshot) => {
      this.getURL(th, 'images/' + image.name);
    }

    );
    //console.log(aaa);
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
   * Finds an image from the server and returns a promise with its url
   * @param location The folder the image is in on server
   * @param name The name of the file in the server
   */
  findImage = (location, name) => {
    return new Promise((resolve, reject) => {
      this.storage().ref().child('/' + location + name).getDownloadURL()
        .then(url => {
          resolve(url);
        })
        .catch(error => {
          reject(error);
        })
    })
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
        if (response.data.msg === "Success") {
          the.setState({ ...the.state, searchedResults: response.data.users, loading: false });
        }
        if (response.data.msg === "No matches") {
          the.setState({ ...the.state, noMatches: true, loading: false })
        }
      })
      .catch(error => {
        return new Error(error.data.msg);
      })
  }

  /**
   * Finds the families that match the searched family
   * @param family the input string for a familie
   * @param the the parent class
   * @return a success message when successful, or an error
   */
  searchFamilies = async (family, the) => {
    let self = this;
    let snapshot = await this.database().ref('/families/').once("value")
    let matches = [];
    if (snapshot.val()) {
      let arr = Object.values(snapshot.val())
      // returns the image of the family
      return Promise.all(arr.map(family => {
        return self.findImage("familyImages/", family.name)
          .then(url => {
            let newFamily = {
              displayName: family.name,
              photoURL: url,
              users: family.users
            }
            console.log(newFamily)
            matches.push(newFamily);
          })
          .catch(err => {
            let newFamily = {
              displayName: family.name
            }
            matches.push(newFamily);
          })
      })).then(() => {
        the.setState({ ...the.state, searchedResults: matches, loading: false });
      })
    }
    else {
      the.setState({ ...the.state, noMatches: true, loading: false })
    }
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
      const onData = snap => {
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

  /**
   * Adds a user to the specified collection (artefact or family)
   * @param user The user to be added
   * @param collectionName Specifies if family or artefact
   * @param collection Actual data object (the family or the artefact) 
   * @return A success message or error
   */
  addUserToCollection = (user, collectionName, collection) => {
    let newUsers = collection["users"];
    newUsers.push(user);
    let name = collectionName === "artefacts" ? collection["artefactName"] : collection["name"];
    this.database().ref('/' + collectionName + '/' + name).update({ users: newUsers })
      .then(() => {
        return MESSAGES.SUCCESS_MESSAGE;
      })
      .catch(error => {
        return error;
      })
  }

  /**
   * Removes families access to artefact
   * @param family The family to be removed
   * @param collectionName Specifies if family or artefact
   * @param collection Actual data object (the family or the artefact)
   * @return A success message or error
   */
  removeFamilyAccess= (family, collectionName, collection) => {
    let updatedFamilies = collection["authFamilies"];
    let removeIndex = -1;
    for (let key in collection["authFamilies"]) {
      if (collection["authFamilies"][key].displayName === family.displayName) {
        removeIndex = key;
      }
    }
    updatedFamilies.splice(removeIndex, 1);
    let name = collection["artefactName"];
    if (removeIndex === -1) {
      return new Error("could not find user in collection");
    }
    console.log("name is " + name + " collection is " + collectionName)
    this.database().ref('/' + collectionName + '/' + name).update({ authFamilies: updatedFamilies })
      .then(() => {
        return MESSAGES.SUCCESS_MESSAGE;
      })
      .catch(error => {
        return error;
      })
  }

  /**
   * Give family access to collection
   * @param family The family to be added to artefact
   * @param collectionName Specifies if family or artefact
   * @param collection Actual data object (the family or the artefact) 
   * @return A success message or error
   */
  grantFamilyAccess = (family, collectionName, collection) => {
    let updatedFamilies = collection["authFamilies"];
    updatedFamilies.push(family);
    let name = collection["artefactName"];
    this.database().ref('/' + collectionName + '/' + name).update({ authFamilies: updatedFamilies })
      .then(() => {
        return MESSAGES.SUCCESS_MESSAGE;
      })
      .catch(error => {
        return error;
      })
  }





  /**
   * Removes a user to the specified collection (family or artefact)
   * @param user The user to be removed
   * @param collectionName Specifies if family or artefact
   * @param collection Actual data object (the family or the artefact)
   * @return A success message or error
   */
  removeUserFromCollection = (user, collectionName, collection) => {
    console.log(collection["users"])
    let newUsers = collection["users"];
    let removeIndex = -1;
    for (let key in collection["users"]) {
      if (collection["users"][key].uid === user.uid) {
        removeIndex = key;
      }
    }
    newUsers.splice(removeIndex, 1);
    let name = collectionName === "artefacts" ? collection["artefactName"] : collection["name"];
    if (removeIndex === -1) {
      return new Error("could not find user in collection");
    }
    this.database().ref('/' + collectionName + '/' + name).update({ users: newUsers })
      .then(() => {
        return MESSAGES.SUCCESS_MESSAGE;
      })
      .catch(error => {
        return error;
      })
  }

  /**
    * Change the admin of a collection (artefact or family)
    * @param newAdmin The new admin of the specified collection
    * @param collectionName Specifies if family or artefact
    * @param collection The database object (the actual family or artefact)
    */
  updateAdmin = (newAdmin, collectionName, collection) => {
    let name = collection["name"];
    // Checks if new admin is already in group and if so, simply updates new Admin as admin
    let exists = false
    for (let key in collection["users"]) {
      if (collection["users"][key].uid === newAdmin.uid) {
        exists = true;
        this.database().ref('/' + collectionName + '/' + name).update({ admin: newAdmin })
          .then(() => {
            return MESSAGES.SUCCESS_MESSAGE;
          })
          .catch(error => {
            return error;
          })
      }
    }
    // New admin doesn't exist in group so we add to the family members then make admin
    if (!exists) {
      this.addToCollection(newAdmin, collectionName, collection)
      this.database().ref('/' + collectionName + '/' + name).update({ admin: newAdmin })
        .then(() => {
          return MESSAGES.SUCCESS_MESSAGE;
        })
        .catch(error => {
          return error;
        })
    }
  }
  /**
     * Retrieves the a particular artefacts' data
     * @param name The artefact name
     * @return The associated family's data or an error
     */
  viewArtefact = (name) => {
    return new Promise((resolve, reject) => {
      const onData = snap => {
        resolve(snap.val());
      }
      const onError = error => reject(error);
      this.database().ref('/artefacts/' + name).on("value", onData, onError)
    });
  }

  /**
   * Write the artifact information to the database
   * @param artifact ID
   * @param artifact name
   * @param artifact origin
   * @param artifact current owner
   * @param artifact description
   */
  // testUploadArtifactData = (artifactID, artifactName, artifactOrigin, artifactCurrentOwner, artifactDescription) => {
  //   this.database().ref('testUploadArtifactData/' + artifactID).set({
  //     artifactName: artifactName,
  //     origin: artifactOrigin,
  //     currentOwner: artifactCurrentOwner,
  //     description: artifactDescription
  //   }, (error) => {
  //     if (error) {
  //       // The write failed...
  //       console.log("Written data FAILED");
  //     } else {
  //       // Data saved successfully!
  //       console.log("Successfully append the data!");
  //     }
  //   }
  //   // New admin doesn't exist in group so we add to the family members then make admin
  //   if (!exists) {
  //     this.addToFamily(newAdmin, collectionName, collection)
  //     this.database().ref('/' + collectionName + '/' + name).update({ admin: newAdmin })
  //       .then(() => {
  //         return MESSAGES.SUCCESS_MESSAGE;
  //       })
  //       .catch(error => {
  //         return error;
  //       })
  //   }
  // }

  /**
   * Create a new artefact
   * @param name The name of the artefact to store
   * @param date The Javascript Date object which stores date of artefact
   * @param location The location from which the artefact belong
   * @param description An optional description of the artefact
   * @param authFamilies A JSON list of the autherised families for the artefact
   * @param authUsers A JSON list of the autherised users for the artefact
   */
  createArtefact = (name, date, location, artefactBrief, description, authFamilies, authUsers, imagesURL) => {
    let currentUser = this.auth.currentUser;
    let fbDate = firebase.firestore.Timestamp.fromDate(date);
    return (
      this.database().ref('artefacts/' + name).set({
        date: fbDate,
        location: location,
        imagesURL: imagesURL,
        artefactBrief: artefactBrief,
        description: description,
        authFamilies: authFamilies,
        authUsers: authUsers,
        artefactName: name,
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

  uploadArtefactFiles = (images, artefactName, values, setValues) => {
    let imagesArr = Array.from(images);
    console.log(imagesArr);
    return Promise.all(imagesArr.forEach(image => {
      console.log("IMAGE UPLOADING");
      console.log(image.name);
      let currentList = values.images.URL;
      return this.storage().ref().child("artefacts/" + artefactName + "/" + image.name).put(image)
        .then((snapshot) => {
          console.log("IMAGE URL GETING");
          console.log(image.name);
          return this.storage().ref().child("artefacts/" + artefactName + "/" + image.name).getDownloadURL()
            .then((url) => {
              currentList.push(url);
              setValues({ ...values, ["imagesURL"]: currentList});
            }).catch(error => {
              console.log("Fetching URL FAILED");
              return error
            })
        })
        .catch(error => {
          console.log("Upload IMAGE FAILED");
          console.error(error);
          return error
        })
    })).then(() => {
      return MESSAGES.SUCCESS_MESSAGE;
    })

    //***********************************************************************//
    /*
    let i;
    for (i=0; i<images.length; i++){
      let image = images[i];
      let currentList = values.imagesURL;
      this.storage().ref().child("artefacts/" + artefactName + "/" + i).put(image).then((snapshot) => {
        console.log("artefacts/" + artefactName + "/" + i);
        this.storage().ref().child("artefacts/" + artefactName + "/" + i).getDownloadURL().then((url) => {
          currentList.push(url);
          setValues({ ...values, ["imagesURL"]: currentList});
        }).catch(error => {
          console.log("Fetching URL FAILED");
          return error;
        })
        console.log('success uploading');
      }).catch(error => {
        console.log("Written data FAILED");
        return error;
      });
    }
    return MESSAGES.SUCCESS_MESSAGE;
    */
  }


  /**
     * get all artefacts a family has access to
     * @param the componenet set to be state
     * @param family the family to check which artefacts it has access too
     */
  getFamiliesArtefactData = async (the, family) => {
    let artefactList = [];
    this.database().ref('/artefacts/').once("value")
      .then(data => {
        // parse through all the artefacts
        for (let key in data.val()) {
          //parse through all the authorised families for each artefact
          for (let familyKey in data.val()[key].authFamilies) {
            console.log("artefacts families" + data.val()[key].authFamilies[familyKey].displayName + "our fam  " + family.name)
            if (data.val()[key].authFamilies[familyKey].displayName === family.name) {

              artefactList.push(data.val()[key]);
            }
          }
        }
        console.log(artefactList)
        //finally, return the list through the state
        the.setState({ ...the.state, artefactList: artefactList });
        the.setState({ dataReady: true })
      })
      .catch(err=> console.log("Couldn't get artefacts"))
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
 * Set Document cookie for user's current session which expires upon closing
 * of the session.
 *
 *           'https://www.w3schools.com/js/js_cookies.asp'
 *
 * @param cname the name of the cookie
 * @param cvalue the value of the cookie
 */
setCookie = (cname, cvalue) => {
  document.cookie = cname + "=" + cvalue + ";" + ";path=/";
}

/**
 * Get Document cookie value for given cookie name.
 *
 *           'https://www.w3schools.com/js/js_cookies.asp'
 *
 * @param cname the name of the cookie
 * @return String value for cookie name
 */
getCookie = (cname) => {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
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




doSignInWithEmailAndPassword = (email, password) => {
  return this.auth.signInWithEmailAndPassword(email, password);
}

doSignOut = () => this.auth.signOut();

doPasswordReset = email => this.auth.sendPasswordResetEmail(email);


doPasswordUpdate = password =>
  this.auth.currentUser.updatePassword(password);
}

export default Firebase;

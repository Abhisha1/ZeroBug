const express = require('express');
const app = express();
const firebase = require("firebase-admin")
var serviceAccount = require("./serviceAccountKey.json")

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://zerobug-f79e9.firebaseio.com"
  });

app.get('/', (req, res) => {

    res.send("HELLO I AM RUNNING ")
});
  

app.listen(3000, () => {
    console.log("listening on port 3000");
});
  

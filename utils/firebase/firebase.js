import firebase, { initializeApp } from "firebase/app";

// this file should be the only firebase app initialization necessary

const config = {
  apiKey: "AIzaSyCTkpCY9y8rvqOr7xsD95H1jO9hjWMBtwU",
  authDomain: "calendoors-app.firebaseapp.com",
  projectId: "calendoors-app",
  storageBucket: "calendoors-app.appspot.com",
  messagingSenderId: "400603635821",
  appId: "1:400603635821:web:cbf951d1cbfa18f2d29f64",
};
initializeApp(config);

export default firebase;

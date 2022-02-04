//require("dotenv").config();

import firebase, { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

//this app could actually be in its own utils file, as the core initialization:
// export const firebaseApp = initializeApp({
//   apiKey: "AIzaSyCTkpCY9y8rvqOr7xsD95H1jO9hjWMBtwU",
//   authDomain: "calendoors-app.firebaseapp.com",
//   projectId: "calendoors-app",
//   storageBucket: "400603635821",
//   appId: "1:400603635821:web:cbf951d1cbfa18f2d29f64",
// });

// const auth = getAuth();

// basic auth functions
const handleUserSignUp = (e) => {
  const
};

const handleUserSignOut = (e) => {
  e.preventDefault();
  //signInWithPopup(auth, provider);
  auth.signOut().then(() => {
    console.log("User has logged out.");
  });
  console.log("Out");
};

const handleUserLogIn = (e) => {
  e.preventDefault();
  //signInWithPopup(auth, provider);
  const currentEmail = uEmail;
  const currentPassword = uPassword;

  signInWithEmailAndPassword(auth, currentEmail, currentPassword).then(
    (cred) => {
      console.log("User Cred:", cred.user);
      console.log("currentUserID:", currentUserID);
      console.log("name:", cred.user.displayName);
      handleUserIDChange(cred.uid);
    }
  );
  console.log("Logged back in");
  setFormToggle(true);
};

// will this work?
const handleUserUpdate = (e, name) => {
  e.preventDefault();
  const currentName = name;
  console.log("UNN:", currentName);
  updateProfile(auth.currentUser, {
    displayName: currentName,
  }).then(() => {
    console.log("Profile Updated!");
  });
};

module.exports = {
  handleUserUpdate,
  handleUserSignUp,
  handleUserSignOut,
  handleUserLogIn,
};

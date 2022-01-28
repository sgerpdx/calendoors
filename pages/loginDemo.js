import React, { useState, useEffect } from "react";
import Image from "next/image";
//import BsPersonCircle from "react-icons/bs";

// firebase imports:
import { initializeApp } from "firebase/app";
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

const firebaseApp = initializeApp({
  apiKey: "AIzaSyCTkpCY9y8rvqOr7xsD95H1jO9hjWMBtwU",
  authDomain: "calendoors-app.firebaseapp.com",
  projectId: "calendoors-app",
  storageBucket: "calendoors-app.appspot.com",
  messagingSenderId: "400603635821",
  appId: "1:400603635821:web:cbf951d1cbfa18f2d29f64",
});

const db = getFirestore();
const auth = getAuth();

export default function LoginDemo({ value }) {
  const [uName, setUName] = useState("");
  const [uEmail, setUEmail] = useState("");
  const [uPassword, setUPassword] = useState("");
  //const [uAvatar, setUAvatar] = useState(BsPersonCircle);
  const [show, setShow] = useState(false);
  const [currentAction, setCurrentAction] = useState("");

  // state passed down from _app:
  const currentUserID = value.currentUserID;
  const handleUserIDChange = value.handleUserIDChange;
  //const firebaseApp = value.firebaseApp;

  //this fires like useEffect on load:
  onAuthStateChanged(auth, (user) => {
    //here we can check to see if user exists
    if (user) {
      console.log("user logged in:", user);
    } else {
      console.log("user logged out");
    }
  });

  const handleOpenForm = (e) => {
    e.preventDefault();
    setCurrentAction(e.target.value);
    console.log("CA:", currentAction);
    setShow(!show);
  };

  const handleFormSubmit = () => {
    const userAction = currentAction;
    if ((userAction = "signup")) handleNewSignUp();
  };

  //currently this signs a user up:
  const handleNewSignUp = (e) => {
    e.preventDefault();
    //get user info -- have to set ids in the form:
    const currentName = uName;
    const currentEmail = uEmail;
    console.log("EMN:", currentEmail);
    const currentPassword = uPassword;
    console.log("PWN:", currentPassword);

    createUserWithEmailAndPassword(auth, currentEmail, currentPassword).then(
      (cred) => {
        console.log("Signed up:", cred);
        setDoc(doc(db, "users", cred.user.uid), {
          username: currentName,
          email: currentEmail,
          avatar: "https://placekitten.com/200/300",
        }).then(console.log("All good!"));
        //this is for app-wide 'local storage':
        //handleUserIDChange(cred.uid);
      }
    );

    //setFormToggle(false);
    //router.push("/setup/");
  };

  const handleNameChange = (e) => {
    e.preventDefault();
    const newName = e.target.value;
    setUName(newName);
  };

  const handleEmailChange = (e) => {
    e.preventDefault();
    const newEmail = e.target.value;
    setUEmail(newEmail);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    const newPassword = e.target.value;
    setUPassword(newPassword);
  };

  useEffect(() => {
    console.log("User:", uName, uEmail, currentAction);
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>Welcome to Calendoors!</h1>
        <button onClick={handleOpenForm} value="signup">
          sign up
        </button>
        <button>log in</button>
        <button>log out</button>
        <figure>
          <Image
            src="https://placekitten.com/200/300"
            width="200"
            height="200"
            alt="cat photo"
          />
          <figcaption>your name:</figcaption>
        </figure>
        <textarea placeholder="user info displays here"></textarea>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "darkgreen",
          color: "blue",
        }}
      >
        {show ? (
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "200px",
              border: "double 1px white",
            }}
            onSubmit={handleFormSubmit}
          >
            <label style={{ margin: "10px" }}>
              Name:
              <input
                type="name"
                name="name"
                required
                onChange={handleNameChange}
              />
            </label>
            <label style={{ margin: "10px" }}>
              Email:
              <input
                type="email"
                name="email"
                required
                onChange={handleEmailChange}
              />
            </label>
            <label style={{ margin: "10px" }}>
              Password:
              <input
                type="password"
                name="password"
                required
                onChange={handlePasswordChange}
              />
            </label>
            <button>Submit</button>
          </form>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

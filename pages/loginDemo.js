import React, { useState, useEffect } from "react";
import Image from "next/image";
//import BsPersonCircle from "react-icons/bs";

// firebase auth imports:
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

export default function LoginDemo({ value }) {
  const [uName, setUName] = useState("");
  const [uEmail, setUEmail] = useState("");
  const [uPassword, setUPassword] = useState("");
  //const [uAvatar, setUAvatar] = useState(BsPersonCircle);

  // state passed down from _app:
  const currentUserID = value.currentUserID;
  const handleUserIDChange = value.handleUserIDChange;
  const firebaseApp = value.firebaseApp;

  const auth = getAuth();

  //this fires like useEffect on load:
  onAuthStateChanged(auth, (user) => {
    //here we can check to see if user exists
    if (user) {
      console.log("user logged in:", user);
    } else {
      console.log("user logged out");
    }
  });

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
        handleUserIDChange(cred.uid);
      }
    );

    //setFormToggle(false);
    //router.push("/setup/");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Welcome to Calendoors!</h1>
      <button>sign up</button>
      <button>log in</button>
      <button>log out</button>
      <figure>
        <Image
          src="https://placekitten.com/200/300"
          width="200"
          height="200"
          alt="cat photo"
        />
        <figcaption>your name</figcaption>
      </figure>
      <textarea placeholder="user info displays here" />
    </div>
  );
}

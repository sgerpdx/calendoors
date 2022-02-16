import React, { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";

// Components:
import LoginModal from "../components/LoginModal";
import InUpForm from "../components/InUpForm";

// graphics imports:
import { MdOutlineSettingsSuggest } from "react-icons/md";
import { RiUserSettingsLine } from "react-icons/ri";
import { AiOutlineStar } from "react-icons/ai";
import { BsPencilSquare } from "react-icons/bs";

// firebase app import (okay that not being called explicitly):
import { firebase } from "../utils/firebase/firebase.js";

// various firebase auth and db imports:
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

// firebase auth + db initialization:
const db = getFirestore();
const auth = getAuth();

export default function Home({ value }) {
  // to control visibility of user form:
  const [formVisibility, setFormVisibility] = useState(false);

  // State from _app:
  const isLoggedIn = value.isLoggedIn;
  const handleLoginChange = value.handleLoginChange;

  // user information:
  const [uName, setUName] = useState("");
  const [uEmail, setUEmail] = useState("");
  const [uPassword, setUPassword] = useState("");
  const [uAvatar, setUAvatar] = useState("https://placekitten.com/200/300");

  // current action for form:
  const [newAction, setNewAction] = useState("signup");

  //router for query params
  const router = useRouter();
  const { pid } = "uid goes here";

  //this needs to be adjusted to include adding the imageURL to the collection as well, unless we combine that into the sign-up:
  const handleUserUpdate = (e) => {
    e.preventDefault();
    const currentName = uName;
    console.log("UNN:", currentName);
    updateProfile(auth.currentUser, {
      displayName: currentName,
    }).then(() => {
      console.log("Profile Updated!");
    });
  };

  const handleActionChange = () => {
    const currentAction = newAction;
    setNewAction(!currentAction);
  }

  //this needs to be adjusted to simple open the modal:
  const handleCalendarSignUp = (e) => {
    e.preventDefault();
    setNewAction("signup");
    setFormToggle(true);

    //for Google sign-in:
    //signInWithPopup(auth, provider);
    //console.log("Signed up");
  };

  //signs user out:
  const handleCalendarSignOut = (e) => {
    e.preventDefault();
    //signInWithPopup(auth, provider);
    auth.signOut().then(() => {
      console.log("User has logged out.");
    });
    console.log("Out");
  };

  //log existing user back in:
  const handleCalendarLogIn = (e) => {
    e.preventDefault();
    setNewAction("login");
    setFormToggle(true);
  };

  //simply shows or hides the form:
  const handleFormVisibility = () => {
    setFormVisibility(!formVisibility);
  };

  // This function can be defined and then called in each of the specific handlers -- could it also be called inline?
  // const handleStateChange = (e, setStateFunction) => {
  //   e.preventDefault();
  //   const newState = e.target.value;
  //   setStateFunction(newState);
  // };

  // Like this -- implement later:
  // const newHandleNameChange = (e) => {
  //   handleStateChange(e, setUName);
  // };

  useEffect(() => {
    console.log("New Name: ", uName);
  }, [uName]);

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

  const handleAvatarChange = (e) => {
    e.preventDefault();
    const newAvatar = e.target.files[0];
    console.log("NA:", newAvatar);
    setUAvatar(newAvatar);
  };

  //currently this signs a user up:
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // get user info -- have to set ids in the form:
    const currentName = uName;
    const currentEmail = uEmail;
    const currentPassword = uPassword;
    const currentAction = newAction;
    const currentLoginStatus = isLoggedIn;

    // console log operating data:
    console.log("Active Info:", uName, uEmail, uPassword);
    console.log("current action:", currentAction);

    if (currentAction === "signup") {
      createUserWithEmailAndPassword(auth, currentEmail, currentPassword).then(
        (cred) => {
          console.log("Signed up:", cred);
          // db.collection("users").doc(cred.user.uid).set({
          //   moniker: currentName,
          // });

          // this creates a record in the users collection to go with the auth user:
          // need to delay this because firestore cannnot be accessed until user auth is established, must be sequential not simultaneous
          // setDoc(doc(db, "users", cred.user.uid), {
          //   username: currentName,
          //   email: currentEmail,
          //   avatar: "https://placekitten.com/200/300",
          // }).then(console.log("All good!"));

          // handleUserIDChange(cred.uid);
        }
      );
      console.log("User signed up.");
    }

    if (currentAction === "login") {
      signInWithEmailAndPassword(auth, currentEmail, currentPassword).then(
        (cred) => {
          console.log("User Cred:", cred.user);
          //console.log("currentUserID:", currentUserID);
          console.log("name:", cred.user.displayName);
          // handleUserIDChange(cred.uid);
        }
      );

      console.log("Logged back in");
    }

    handleLoginChange(true);
    setFormVisibility(false);
    // router.push("/setup/");
  };

  // Simply logs current user info whenever uEmail changes:
  useEffect(() => {
    console.log("NEAPWAV:", uName, uEmail, uPassword, uAvatar);
  }, []);

  // Updates login status to current for conditional rendering of header
  // This seems unnecessary??? it's just reversing itself???
  // useEffect(() => {
  //   const currentLoginStatus = isLoggedIn;
  //   handleLoginChange(!currentLoginStatus);
  // }, [isLoggedIn]);

  return (
    <>
      <section className={styles.loginControls}>
        <button onClick={handleFormVisibility} className={styles.loginButton}>
          <BsPencilSquare />
          <span style={{ marginLeft: "10px" }}>show form</span>
        </button>
        <div>
          <button onClick={handleCalendarSignUp} className={styles.loginButton}>
            Sign Up
          </button>
          <button
            onClick={handleCalendarSignOut}
            className={styles.loginButton}
          >
            Sign Out
          </button>
          <button onClick={handleCalendarLogIn} className={styles.loginButton}>
            Log In
          </button>
          <p style={{ margin: "10px" }}>
            <MdOutlineSettingsSuggest />
            <span> User Settings</span>
          </p>
          <a
            href="https://advent-calendar-2021-teal.vercel.app/"
            target="_blank"
          >
            <p style={{ margin: "10px" }}>
              <AiOutlineStar />
              <span> Demo</span>
            </p>
          </a>
        </div>
      </section>
      <section className={styles.loginDataBox}>
        <textarea placeholder="user data here"></textarea>
      </section>
      <section className={styles.loginFormContainer}>
        {formVisibility ? (
          <InUpForm
            nameChange={handleNameChange}
            emailChange={handleEmailChange}
            passwordChange={handlePasswordChange}
            formSubmit={handleFormSubmit}
            handleAction={handleActionChange}
          />
        ) : (
          <></>
        )}
      </section>
    </>
  );
}

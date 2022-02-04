import React, { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";

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
  const [formToggle, setFormToggle] = useState(false);

  // user information:
  const [uName, setUName] = useState("");
  const [uEmail, setUEmail] = useState("");
  const [uPassword, setUPassword] = useState("");
  const [uAvatar, setUAvatar] = useState("https://placekitten.com/200/300");

  // current action for form:
  const [newAction, setNewAction] = useState("");

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
  const handleFormViz = (e) => {
    setFormToggle(!formToggle);
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

          //this creates a record in the users collection to go with the auth user:
          setDoc(doc(db, "users", cred.user.uid), {
            username: currentName,
            email: currentEmail,
            avatar: "https://placekitten.com/200/300",
          }).then(console.log("All good!"));

          handleUserIDChange(cred.uid);
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
          handleUserIDChange(cred.uid);
        }
      );
      console.log("Logged back in");
    }
    setFormToggle(false);
    router.push("/setup/");
  };

  //simply logs current user info whenever uEmail changes:
  useEffect(() => {
    console.log("NEAPWAV:", uName, uEmail, uPassword, uAvatar);
  }, []);
  return (
    <>
      <section className={styles.loginControls}>
        <button onClick={handleFormViz} className={styles.loginButton}>
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
        <div>
          {formToggle ? (
            <>
              <form id="signup-form">
                <fieldset>
                  <legend>account:</legend>
                  <div>
                    <label htmlFor="signup-name">name:</label>
                    <input
                      type="name"
                      name="name"
                      onChange={handleNameChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="signup-email">email:</label>
                    <input
                      type="email"
                      name="email"
                      onChange={handleEmailChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="signup-password">password:</label>
                    <input
                      type="password"
                      name="password"
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>

                  {/* <form action="/action_page.php">
                    Upload Avatar Image:
                    <input type="file" name="filename" />
                  </form> */}
                  <button onClick={handleFormSubmit}>submit</button>
                </fieldset>
              </form>

              <fieldset>
                <form>
                  <label htmlFor="img">Select image:</label>
                  <input type="file" id="img" name="img" accept="image/*" />
                  <input type="submit" onSubmit={handleAvatarChange} />
                </form>
                <button onClick={handleUserUpdate}>submit</button>
              </fieldset>
            </>
          ) : (
            <></>
          )}
        </div>
      </section>
    </>
  );
}

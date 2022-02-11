import React, { useState } from "react";
import "../styles/globals.css";
import Head from "next/head";
import Layout from "../components/Layout";

// firebase app import (okay that not being called explicitly):
import { firebase } from "../utils/firebase/firebase.js";

// firebase auth setup:
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
const auth = getAuth();

//

function MyApp({ Component, pageProps }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUserID, setCurrentUserID] = useState("135792468");
  const [show, setShow] = useState(false);

  const handleUserIDChange = (userID) => {
    setCurrentUserID(userID);
    console.log("User ID changed.");
  };

  const handleLoginChange = (newBoolean) => {
    setIsLoggedIn(newBoolean);
  };

  onAuthStateChanged(auth, (user) => {
    //here we can check to see if user exists
    if (user) {
      setIsLoggedIn(true);
      console.log("user logged in:", user);
    } else {
      setIsLoggedIn(false);
      console.log("user logged out");
    }
  });

  const handleShowChange = () => {
    setShow(!show);
  };

  const state = { auth, isLoggedIn, handleLoginChange, show, handleShowChange };

  return (
    <>
      <Head>
        <title>Calendoors</title>
        <link rel="icon" href="/fake-logo.png" type="image/png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout
        loginStatus={isLoggedIn}
        updateLogin={handleLoginChange}
        changeShow={handleShowChange}
      >
        <Component {...pageProps} value={state} />
      </Layout>
    </>
  );
}

export default MyApp;

import React, { useState } from "react";
import "../styles/globals.css";
import Head from "next/head";
import Layout from "../components/Layout";

// firebase app import (okay that not being called explicitly):
import { firebase } from "../utils/firebase/firebase.js";

// firebase auth setup:
import { getAuth, onAuthStateChanged } from "firebase/auth";
const auth = getAuth();

//

function MyApp({ Component, pageProps }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUserID, setCurrentUserID] = useState("135792468");

  const handleUserIDChange = (userID) => {
    setCurrentUserID(userID);
    console.log("User ID changed.");
  };

  const state = { auth, isLoggedIn, currentUserID, handleUserIDChange };

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

  return (
    <>
      <Head>
        <title>Calendoors</title>
        <link rel="icon" href="/fake-logo.png" type="image/png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout>
        <Component {...pageProps} value={state} />
      </Layout>
    </>
  );
}

export default MyApp;

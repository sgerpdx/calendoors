import React, { useState } from "react";
import "../styles/globals.css";
import Head from "next/head";
import Layout from "../components/Layout";

//
import { getAuth } from "firebase/auth";

//

function MyApp({ Component, pageProps }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUserID, setCurrentUserID] = useState("135792468");

  const handleUserIDChange = (userID) => {
    setCurrentUserID(userID);
    console.log("User ID changed.");
  };

  // const firebaseApp = initializeApp({
  //   apiKey: "AIzaSyCTkpCY9y8rvqOr7xsD95H1jO9hjWMBtwU",
  //   authDomain: "calendoors-app.firebaseapp.com",
  //   projectId: "calendoors-app",
  //   storageBucket: "400603635821",
  //   appId: "1:400603635821:web:cbf951d1cbfa18f2d29f64",
  // });

  const state = { isLoggedIn, currentUserID, handleUserIDChange };

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

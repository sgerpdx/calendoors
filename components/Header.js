import React, { useState, useEffect } from "react";
import styles from "../styles/Header.module.css";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";

// Firebase app import:
import { firebase } from "../utils/firebase/firebase.js";

// Firebase auth imports:
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const auth = getAuth();
//
import AppLogo from "../public/fake-logo.png";

export default function Header({ loginStatus }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(true);
  }, []);
  //
  const router = useRouter();

  const handleCalendarSignOut = (e) => {
    e.preventDefault();
    //signInWithPopup(auth, provider);
    auth.signOut().then(() => {
      console.log("User has logged out.");
    });
    console.log("Out");
    router.push("/");
  };

  return (
    <section className={styles.headerContainer}>
      <div className={styles.headerLogoArea}>
        <Image src={AppLogo} width="36" height="36" alt="website logo" />
      </div>
      <div className={styles.headerTitleArea}>
        <h1>Calendoors</h1>
      </div>
      <div className={styles.headerLoginArea}>
        {isLoggedIn ? (
          <button
            className={styles.loginButton}
            onClick={handleCalendarSignOut}
          >
            logout
          </button>
        ) : (
          <button className={styles.loginButton}>login</button>
        )}
      </div>
    </section>
  );
}

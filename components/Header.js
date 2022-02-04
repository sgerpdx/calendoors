import React from "react";
import styles from "../styles/Header.module.css";
import Image from "next/image";

//
import AppLogo from "../public/fake-logo.png";

export default function Header({ loginStatus }) {
  const isLoggedIn = loginStatus;

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
          <button className={styles.loginButton}>logout</button>
        ) : (
          <button className={styles.loginButton}>login</button>
        )}
      </div>
    </section>
  );
}

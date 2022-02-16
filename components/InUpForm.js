import React, { useState, useEffect, useContext } from "react";
import styles from "../styles/Modal.module.css";
import LoginContext from "../context/LoginContext";

export default function InUpForm({
  nameChange,
  emailChange,
  passwordChange,
  formSubmit,
  handleAction,
}) {
  const [isUser, setIsUser] = useState(false);

  // Context import
  const userContext = useContext(LoginContext);
  const whoIsDog = userContext.dogName;
  const userID = userContext.currentUserID;

  // Form logic
  const handleExistingUser = () => {
    setIsUser(!isUser);
    handleAction();
  };

  return (
    <>
      <div>
        {isUser ? (
          <>
            <h2>Login to Your Account</h2>
            <form id="signup-form">
              <fieldset>
                <div>
                  <label htmlFor="signup-email">Email Address: </label>
                  <input
                    onChange={emailChange}
                    type="email"
                    name="email"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="signup-password">Password: </label>
                  <input
                    onChange={passwordChange}
                    type="password"
                    name="password"
                    required
                  />
                </div>
                <button onClick={formSubmit}>login</button>
              </fieldset>
            </form>
            <div>
              <p>
                new user?{" "}
                <button
                  className={styles.loginButton}
                  onClick={handleExistingUser}
                >
                  sign-up
                </button>
              </p>
            </div>
          </>
        ) : (
          <>
            <h2>Create Your Account</h2>
            <form id="signup-form">
              <fieldset>
                <div>
                  <label htmlFor="signup-name">User Name: </label>
                  <input
                    onChange={nameChange}
                    type="name"
                    name="name"
                    // required
                  />
                </div>
                <div>
                  <label htmlFor="signup-email">Email Address: </label>
                  <input
                    onChange={emailChange}
                    type="email"
                    name="email"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="signup-password">Password: </label>
                  <input
                    onChange={passwordChange}
                    type="password"
                    name="password"
                    required
                  />
                </div>
                <button onClick={formSubmit}>sign-up</button>
              </fieldset>
            </form>
            <div>
              <p>
                already signed up?{" "}
                <button
                  className={styles.loginButton}
                  onClick={handleExistingUser}
                >
                  login
                </button>
              </p>
            </div>
          </>
        )}
      </div>
      <div>
        <p>{whoIsDog}</p>
        <p>{userID}</p>
      </div>

      {/* <fieldset>
        <form>
          <label htmlFor="img">Select image:</label>
          <input type="file" id="img" name="img" accept="image/*" />
          <input type="submit" />
        </form>
        <button>submit</button>
      </fieldset> */}
      {/* <div>
        <p>
          already signed up?{" "}
          <button className={styles.loginButton} onClick={handleExistingUser}>
            login
          </button>
        </p>
      </div>
      <div>
        <p>
          new user?{" "}
          <button className={styles.loginButton} onClick={handleExistingUser}>
            sign-up
          </button>
        </p>
      </div> */}
    </>
  );
}

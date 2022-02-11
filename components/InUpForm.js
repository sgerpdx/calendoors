import React, { useState, useEffect } from "react";
import styles from "../styles/Modal.module.css";

export default function InUpForm() {
  const [isUser, setIsUser] = useState(false);

  // Form logic:
  const handleExistingUser = () => {
    setIsUser(!isUser);
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
                  <input type="email" name="email" required />
                </div>
                <div>
                  <label htmlFor="signup-password">Password: </label>
                  <input type="password" name="password" required />
                </div>
                <button>login</button>
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
                  <input type="name" name="name" required />
                </div>
                <div>
                  <label htmlFor="signup-email">Email Address: </label>
                  <input type="email" name="email" required />
                </div>
                <div>
                  <label htmlFor="signup-password">Password: </label>
                  <input type="password" name="password" required />
                </div>
                <button>sign-up</button>
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

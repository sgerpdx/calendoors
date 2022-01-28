import React, { useState, useEffect } from "react";
import Image from "next/image";

// various firebase imports:
import firebase, { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

// firebase app + auth + db initialization:
const config = {
  apiKey: "AIzaSyCTkpCY9y8rvqOr7xsD95H1jO9hjWMBtwU",
  authDomain: "calendoors-app.firebaseapp.com",
  projectId: "calendoors-app",
  storageBucket: "calendoors-app.appspot.com",
  messagingSenderId: "400603635821",
  appId: "1:400603635821:web:cbf951d1cbfa18f2d29f64",
};
initializeApp(config);
const db = getFirestore();
const auth = getAuth();

export default function Login() {
  const [formToggle, setFormToggle] = useState(false);
  const [uName, setUName] = useState("");
  const [uEmail, setUEmail] = useState("");
  const [uPassword, setUPassword] = useState("");
  const [uAvatar, setUAvatar] = useState("https://placekitten.com/200/300");

  //this fires like useEffect on load:
  onAuthStateChanged(auth, (user) => {
    //here we can check to see if user exists
    if (user) {
      console.log("user logged in:", user);
    } else {
      console.log("user logged out");
    }
  });

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
    //signInWithPopup(auth, provider);

    console.log("Signed up");
    setFormToggle(true);
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
    //signInWithPopup(auth, provider);
    const currentEmail = uEmail;
    const currentPassword = uPassword;

    signInWithEmailAndPassword(auth, currentEmail, currentPassword).then(
      (cred) => {
        console.log("User Cred:", cred.user);
        console.log("currentUserID:", currentUserID);
        console.log("name:", cred.user.displayName);
        handleUserIDChange(cred.uid);
      }
    );
    console.log("Logged back in");
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
    //get user info -- have to set ids in the form:
    const currentName = uName;
    const currentEmail = uEmail;
    console.log("EMN:", currentEmail);
    const currentPassword = uPassword;
    console.log("PWN:", currentPassword);

    // await auth.createUserWithEmailAndPassword(currentEmail, currentPassword);
    createUserWithEmailAndPassword(auth, currentEmail, currentPassword).then(
      (cred) => {
        console.log("Signed up:", cred);
        // db.collection("users").doc(cred.user.uid).set({
        //   moniker: currentName,
        // });

        setDoc(doc(db, "users", cred.user.uid), {
          username: currentName,
          email: currentEmail,
          avatar: "https://placekitten.com/200/300",
        }).then(console.log("All good!"));

        // set(ref(db, "users/" + cred.user.uid), {
        //   username: currentName,
        //   email: currentEmail,
        //   avatar: "https://placekitten.com/200/300",
        // });

        //handleUserIDChange(cred.uid);
      }
    );

    setFormToggle(false);
  };

  //simply logs current user info whenever uEmail changes:
  useEffect(() => {
    console.log("NEAPWAV:", uName, uEmail, uPassword, uAvatar);
  }, []);

  // useEffect(() => {
  //   const newUID = user.uid;
  //   handleUserIDChange(newUID);
  // }, [uEmail]);
  return (
    <>
      <section
        style={{ display: "flex", flexDirection: "row", color: "white" }}
      >
        <button
          onClick={handleFormViz}
          style={{ backgroundColor: "yellow", color: "grey" }}
        >
          --test--
        </button>
        <div>Calendar</div>
        <div>
          <button
            onClick={handleCalendarSignUp}
            style={{ backgroundColor: "green", color: "white" }}
          >
            Sign Up
          </button>
          <button
            onClick={handleCalendarSignOut}
            style={{ backgroundColor: "blue", color: "white" }}
          >
            Sign Out
          </button>
          <button
            onClick={handleCalendarLogIn}
            style={{ backgroundColor: "purple", color: "white" }}
          >
            Log In
          </button>
        </div>
      </section>
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "grey",
        }}
      >
        <h2>Welcome:</h2>
        <figure>
          <Image src="https://placekitten.com/200/300" width="120" height="120" />
          <figcaption>user name</figcaption>
        </figure>
        <textarea placeholder="user data here"></textarea>
      </section>
      <section style={{ color: "grey" }}>
        <div>
          {formToggle ? (
            <>
              <form id="signup-form">
                <fieldset>
                  <legend>account:</legend>

                  <div>
                    <input
                      type="email"
                      name="email"
                      onChange={handleEmailChange}
                      required
                    />
                    <label htmlFor="signup-email">email:</label>
                  </div>
                  <div>
                    <input
                      type="password"
                      name="password"
                      onChange={handlePasswordChange}
                      required
                    />
                    <label htmlFor="signup-password">password:</label>
                  </div>
                  <div>
                    <input
                      type="name"
                      name="name"
                      onChange={handleNameChange}
                      required
                    />
                    <label htmlFor="signup-name">name:</label>
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
            // <form onSubmit={handleSubmit}>
            //   <label>
            //     First Name:
            //     <input
            //       type="text"
            //       value={name}
            //       onChange={(e) => setName(e.target.value)}
            //     />
            //   </label>
            //   <input type="submit" value="Submit" />
            // </form>
            <></>
          )}
        </div>
      </section>
    </>
  );
}

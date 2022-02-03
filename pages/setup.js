import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/dist/client/router";

// firebase imports (see if can move some to _app):
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
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

//
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

export default function setup({ value }) {
  const [userID, setUserID] = useState("47TNsXmOFkW5rDYV3Jnj3YpUxiN2");
  const [uName, setUName] = useState("");
  const [uEmail, setUEmail] = useState("");
  const [uAvatar, setUAvatar] = useState("https://placekitten.com/200/300");

  // state from _app (maybe unnecessary with onAuthStateChanged)
  //   const currentUserID = value.currentUserID;
  //   const handleUserIDChange = value.handleUserIDChange;

  // router
  const router = useRouter();
  //   const { pid } = router.query;

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // do something
      // grab uid and use to call function getting user image and name from firestore collection
      const currentUID = user.uid;
      console.log("Current ID:", currentUID);
      setUserID(currentUID);
    } else {
      // do something else
    }
  });

  const getUserInfo = async (userID) => {
    const docRef = doc(db, "users", userID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Box document data;", docSnap.data());
      return docSnap.data();
    } else {
      console.log("No document.");
    }
  };

  useEffect(() => {
    const currentName = uName;
    const currentEmail = uEmail;
    const currentAvatar = uAvatar;
    const currentID = userID;
    grabUser(currentID);
    console.log("NEAMANA:", currentName, currentEmail, currentAvatar);
  }, []);

  const grabUser = async (id) => {
    // basically the 'currentUID' passed in is from onAuthStateChanged, which should maybe be called inside component:
    const userInfo = await getUserInfo(id);
    console.log("UI:", userInfo);
    setUName(userInfo.username);
    setUEmail(userInfo.email);
    setUAvatar(userInfo.avatar);

    console.log("Name:", userInfo.username);
  };

  return (
    <>
      <h2>User Information Page</h2>
      <figure>
        <Image src={uAvatar} width="120" height="120" />
        <figcaption>you</figcaption>
        <ul>
          <li>name: {uName}</li>
          <li>email: {uEmail}</li>
        </ul>
      </figure>
    </>
  );
}

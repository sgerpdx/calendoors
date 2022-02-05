import React from "react";
import Header from "./Header";

export default function Layout({ loginStatus, updateLogin, children }) {
  return (
    <>
      <Header loginStatus={loginStatus} updateLogin={updateLogin} />
      {children}
    </>
  );
}

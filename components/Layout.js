import React from "react";
import Header from "./Header";

export default function Layout({ loginStatus, updateLogin, changeShow, children }) {
  return (
    <>
      <Header loginStatus={loginStatus} updateLogin={updateLogin} changeShow={changeShow} />
      {children}
    </>
  );
}

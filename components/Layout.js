import React from "react";
import Header from "./Header";

export default function Layout({ loginStatus, children }) {
  return (
    <>
      <Header loginStatus={loginStatus} />
      {children}
    </>
  );
}

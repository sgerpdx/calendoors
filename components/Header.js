import React from "react";

export default function Header() {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          backgroundColor: "blue",
          color: "white",
        }}
      >
        <h1>Calendoors</h1>
      </div>
    </>
  );
}

import React from "react";

export default function LoginModal({ show, onClose }) {
  if (!show) {
    return null;
  }

  return (
    <>
      <div>
        <p>User Account Modal</p>
      </div>
      <div style={{ backgroundColor: "darkgreen", color: "white" }}>
        <form onSubmit="submitForm">
          <label>
            Name:
            <input onchange="changeName"></input>
          </label>
          <label>
            Email:
            <input onchange="changeEmail"></input>
          </label>
          <label>
            Password:
            <input onchange="changePassword"></input>
          </label>
          <button onClick={onClose}>Submit</button>
        </form>
      </div>
    </>
  );
}

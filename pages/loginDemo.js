import React from "react";
import Image from "next/image";

export default function LoginDemo() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Welcome to Calendoors!</h1>
      <button>sign up</button>
      <button>log in</button>
      <button>log out</button>
      <figure>
        <Image
          src="https://placekitten.com/200/300"
          width="200"
          height="200"
          alt="cat photo"
        />
        <figcaption>your name</figcaption>
      </figure>
      <textarea placeholder="user info displays here" />
    </div>
  );
}

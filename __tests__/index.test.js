/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";
// for use of toBeInTheDocument():
import "@testing-library/jest-dom";
import Home from "../pages/index";

jest.mock(
  "next/image",
  () =>
    function Image({ src, alt, height, width }) {
      // eslint-disable-next-line @next/next/no-img-element
      return <img src={src} alt={alt} height={height} width={width} />;
    }
);

// the following test works for index.js as a simple page with no imported components and only a heading, button and Nextjs image on the page:
//
// describe("Home", () => {
//   it("renders the Home/Index page", async () => {
//     render(<Home />);

//     const welcomeHeading = await screen.getByText("Welcome to Calendoors!");

//     const userImage = await screen.getByRole("img", {
//       name: "cat photo",
//     });

//     const signInButton = await screen.getByRole("button", { name: "sign up" });

//     expect(welcomeHeading).toBeInTheDocument();
//     expect(userImage).toBeInTheDocument();
//     expect(signInButton).toBeInTheDocument();
//   });
// });

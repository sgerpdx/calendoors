/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";
// for use of toBeInTheDocument():
import "@testing-library/jest-dom";

jest.mock(
  "next/image",
  () =>
    function Image({ src, alt, height, width }) {
      // eslint-disable-next-line @next/next/no-img-element
      return <img src={src} alt={alt} height={height} width={width} />;
    }
);

describe("Home", () => {
  const welcomeHeading = await screen.getByText("Welcome to Calendoors!");

  expect(welcomeHeading).toBeInTheDocument();
});

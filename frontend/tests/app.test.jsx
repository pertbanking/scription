// -*- encoding: utf-8 -*-
//
// (c) Joshua Petrin 2025. All rights reserved.
//
// File creation date: ???
// File creator: Joshua Petrin

import { render, screen } from "@testing-library/react";
import App from "../src/app";

it.skip("render whole app", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

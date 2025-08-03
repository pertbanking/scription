// -*- encoding: utf-8 -*-
//
// (c) Joshua Petrin 2025. All rights reserved.
//
// File creation date: 02 August 2025
// File creator: Joshua Petrin

import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";

// Credit to Corina Udrescu, who provided me with this setup file:
// https://reactpractice.dev/articles/simple-react-and-vite-setup-with-unit-testing/

expect.extend(matchers);

afterEach(() => {
  cleanup();
});

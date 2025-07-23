// -*- encoding: utf-8 -*-
//
// (c) Joshua Petrin 2025. All rights reserved.
//
// File creation date: 18 July 2025
// File creator: Joshua Petrin

import { render, screen } from "@testing-library/react";
import QuizText from "../components/quizzer/quiz_text";

test("render text", () => {
  let text = "a fine shotgun";
  render(<QuizText text={text} userGuesses={"afs"} />);
  const linkElement = screen.getByText(/shotgun/);
  expect(linkElement).toBeInTheDocument();
});

test("render incorrect guess", () => {
  let text = "a fine blueberry";
  render(<QuizText text={text} userGuesses={"n"} />);
  const linkElement = screen.getByText("a");
  expect(linkElement).toBeInTheDocument();
  expect(linkElement.className).toMatch(/has-text-danger/);
});

test("only render guessed words", () => {
  let text = "a fine blueberry";
  render(<QuizText text={text} userGuesses={"ad"} />);
  const linkElement = screen.queryByText(/blueberry/);
  expect(linkElement).toBeNull();
});

test("render verse numbers", () => {
  let text = "{2} He was in the beginning with God";
  render(<QuizText text={text} userGuesses={"hw"} />);
  const linkElement = screen.getByText("2");
  expect(linkElement).toBeInTheDocument();
});

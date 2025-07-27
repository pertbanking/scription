// -*- encoding: utf-8 -*-
//
// (c) Joshua Petrin 2025. All rights reserved.
//
// File creation date: 18 July 2025
// File creator: Joshua Petrin

import { render, screen } from "@testing-library/react";
import QuizText from "../components/quizzer/quiz_text";

test("Render text", () => {
  let text = "a fine shotgun";
  render(<QuizText text={text} userGuesses={"afs"} />);
  const linkElement = screen.getByText(/shotgun/);
  expect(linkElement).toBeInTheDocument();
});

test("Render incorrect guess", () => {
  let text = "a fine blueberry";
  render(<QuizText text={text} userGuesses={"n"} />);
  const linkElement = screen.getByText("a");
  expect(linkElement).toBeInTheDocument();
  expect(linkElement.className).toMatch(/has-text-danger/);
});

test("Only render guessed words", () => {
  let text = "a fine blueberry";
  render(<QuizText text={text} userGuesses={"ad"} />);
  const linkElement = screen.queryByText(/blueberry/);
  expect(linkElement).toBeNull();
});

test("Render punctuation", () => {
  let text = "Hey, you! Yeah, you!";
  render(<QuizText text={text} userGuesses={"hyy"} />);
  const heyElement = screen.getByText(/hey/i);
  expect(heyElement.innerHTML).toEqual("Hey,");
  const youElement = screen.getByText(/you/i);
  expect(youElement.innerHTML).toEqual("you!");
});

test("Don't render punctuation on current word", () => {
  let text = "What is it, Rick?";
  render(<QuizText text={text} userGuesses={"wii"} />);
  const linkElement = screen.getByText(/it/);
  expect(linkElement.innerHTML).toEqual("it");
});

test("Render final punctuation", () => {
  let text = "Who will ascend the hill of the Lord?";
  render(<QuizText text={text} userGuesses={"wwathotl"} />);
  const linkElement = screen.getByText(/Lord/);
  expect(linkElement).toBeInTheDocument();
  expect(linkElement.innerHTML).toMatch("Lord?");
});

test("Don't count verse numbers as typed words", () => {
  let text = "{2} He was in the beginning with God";
  render(<QuizText text={text} userGuesses={"hw"} />);
  const linkElement = screen.getAllByText(/./);
  expect(linkElement.length).toEqual(3);
});

test("Render verse numbers at verse start", () => {
  let text = "{2} He was in the beginning with God";
  render(<QuizText text={text} userGuesses={"hw"} />);
  const linkElement = screen.getByText("2");
  expect(linkElement).toBeInTheDocument();
});

test("Render verse numbers in verse middle", () => {
  let text = "of the honeycomb. {11} Moreover, by them is your servant warned";
  render(<QuizText text={text} userGuesses={"othmbt"} />);
  const linkElement = screen.getByText("11");
  expect(linkElement).toBeInTheDocument();
});

test.skip("Don't render verse numbers at verse end", () => {
  let text = "{1} Comfort, comfort my people, says your God. {2}";
  render(<QuizText text={text} userGuesses={"ccmpsygs"} />);
  const linkElement = screen.queryByText("2");
  expect(linkElement).toBeNull();
});

test("Too many user guesses", () => {
  let text = "Short and sweet!";
  render(<QuizText text={text} userGuesses={"whatdidyoujustsaytomeyoulittle"} />);
  const linkElements = screen.getAllByText(/./); // get every element
  expect(linkElements.length).toEqual(3);
});

test("Put spaces between words", () => {
  let text = "{1} Count Doku said, {2} \"Give me a bath.\"";
  render(<QuizText text={text} userGuesses={"cdsgmab"} />);
  // Document.getElementById()
});

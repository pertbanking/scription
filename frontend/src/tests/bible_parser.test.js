// -*- encoding: utf-8 -*-
//
// (c) Joshua Petrin 2024. All rights reserved.
//
// File creation date: 15 November 2024
// File creator: Joshua Petrin

/// Test the Bible parser (make sure it doesn't commit any heresy)

import importVerse from "../bible_parser";

test("john first verse", () => {
  let expected =
    "In the beginning was the word, and the word was with God, and the word was God.";

  expect(importVerse("john", 1, 1)).toBe(expected);
  expect(importVerse("John", 1, 1)).toBe(expected);
  expect(importVerse("jOhN", 1, 1)).toBe(expected);
});

test("john second verse", () => {
  let expected = "He was in the beginning with God.";

  expect(importVerse("john", 1, 2)).toBe(expected);
});

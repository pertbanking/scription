// -*- encoding: utf-8 -*-
//
// (c) Joshua Petrin 2025. All rights reserved.
//
// File creation date: 03 August 2025
// File creator: Joshua Petrin

const { test, expect } = require("@jest/globals");
const bookshelf = require("../../app/bookshelf.js");

test("Get a single Bible verse", () => {
  let result = bookshelf.getEsv().getVerse("genesis", 1, 1);
  expect(result).toEqual("In the beginning, God created the heavens and the earth.")
});

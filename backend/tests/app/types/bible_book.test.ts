// -*- encoding: utf-8 -*-
//
// (c) Joshua Petrin 2025. All rights reserved.
//
// File creation date: 06 November 2025
// File creator: Joshua Petrin

import { Book } from "../../../app/types/bible_book";

describe("Book.toBook", () => {
  beforeEach(() => {});
  afterEach(() => {});

  test("should convert strings to Books, case insensitive", () => {
    expect(Book.toBook("genesis")).toEqual(Book.Genesis);
    expect(Book.toBook("Philippians")).toEqual(Book.Philippians);
    expect(Book.toBook("JaMeS")).toEqual(Book.James);
    expect(Book.toBook("John")).toEqual(Book.John);
  });

  test("should convert books with spaces", () => {
    expect(Book.toBook("1 john")).toEqual(Book.FirstJohn);
    expect(Book.toBook("1 Samuel")).toEqual(Book.FirstSamuel);
    expect(Book.toBook("2 CHRONICLES")).toEqual(Book.SecondChronicles);
  });

  test("should throw an error for nonsense books", () => {
    expect(() => Book.toBook("thomas")).toThrow();
    expect(() => Book.toBook("Peter")).toThrow();
    expect(() => Book.toBook("")).toThrow();
  });
});

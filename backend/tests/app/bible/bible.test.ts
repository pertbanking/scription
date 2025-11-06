// -*- encoding: utf-8 -*-
//
// (c) Joshua Petrin 2025. All rights reserved.
//
// File creation date: 03 August 2025
// File creator: Joshua Petrin

import { Bible } from "../../../app/bible/bible";
import { VerseRef, Verse } from "../../../app/types/bible_verse";
import { Book } from "../../../app/types/bible_book";

/**
 * Mock implementation of Bible for testing the abstract class
 */
class MockBible extends Bible {
  public mockVerses: Map<string, string> = new Map();

  async fetch(start: VerseRef, end?: VerseRef): Promise<Verse[]> {
    const verses: Verse[] = [];

    // Default end to start if not provided
    const endRef = end ?? start;

    // Iterate through the verse range
    /// TODO: This only handles verses within the same book
    for (let v = start.verse; v <= endRef.verse; v++) {
      const key = `${start.book}:${start.chapter}:${v}`;
      const text = this.mockVerses.get(key);
      if (!text) {
        throw new Error(`Verse not found: ${key}`);
      }
      const ref = new VerseRef(start.book, start.chapter, v);
      verses.push(new Verse(ref, text, []));
    }

    return verses;
  }

  exists(ref: VerseRef): boolean {
    const key = `${ref.book}:${ref.chapter}:${ref.verse}`;
    return this.mockVerses.has(key);
  }

  /**
   * Helper method to set up mock verse data
   */
  setMockVerse(book: string, chapter: number, verse: number, text: string) {
    const key = `${book.toLowerCase()}:${chapter}:${verse}`;
    this.mockVerses.set(key, text);
  }
}

describe("Bible abstract class", () => {
  test("should allow concrete implementations to extend it", () => {
    const mockBible = new MockBible();
    expect(mockBible).toBeInstanceOf(Bible);
  });

  test("exists() should return true for verses that exist", () => {
    const mockBible = new MockBible();
    mockBible.setMockVerse("john", 3, 16, "For God so loved the world...");

    const ref = new VerseRef(Book.John, 3, 16);
    expect(mockBible.exists(ref)).toBe(true);
  });

  test("exists() should return false for verses that do not exist", () => {
    const mockBible = new MockBible();

    const ref = new VerseRef(Book.Genesis, 100, 1);
    expect(mockBible.exists(ref)).toBe(false);
  });

  test("fetchVerses() should handle verse ranges", async () => {
    const mockBible = new MockBible();
    mockBible.setMockVerse("genesis", 1, 1, "In the beginning...");
    mockBible.setMockVerse("genesis", 1, 2, "And the earth was without form...");
    mockBible.setMockVerse("genesis", 1, 3, "And God said, Let there be light...");

    const start = new VerseRef(Book.Genesis, 1, 1);
    const end = new VerseRef(Book.Genesis, 1, 3);
    const result = await mockBible.fetch(start, end);

    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(3);
    expect(result[0].text).toMatch(/beginning/);
    expect(result[1].text).toMatch(/earth/);
    expect(result[2].text).toMatch(/light/);
  });

  test("fetchVerses() should return a single verse, given start === end", async () => {
    const mockBible = new MockBible();
    mockBible.setMockVerse("john", 3, 16, "For God so loved the world.");

    const start = new VerseRef(Book.John, 3, 16);
    const end = new VerseRef(Book.John, 3, 16);
    const result = await mockBible.fetch(start, end);

    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(1);
    expect(result[0].text).toMatch(/God so loved the world/);
    expect(result[0].ref.verse).toBe(16);
  });

  test("fetchVerses() should throw error for nonexistent verses", async () => {
    const mockBible = new MockBible();

    const start = new VerseRef(Book.Revelation, 99, 99);
    const end = new VerseRef(Book.Revelation, 99, 99);

    await expect(mockBible.fetch(start, end)).rejects.toThrow();
  });

  test("fetch() should default to single verse when end is not provided", async () => {
    const mockBible = new MockBible();
    mockBible.setMockVerse("psalms", 23, 1, "The LORD is my shepherd.");

    const start = new VerseRef(Book.Psalms, 23, 1);
    const result = await mockBible.fetch(start);

    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(1);
    expect(result[0].text).toMatch(/LORD is my shepherd/);
    expect(result[0].ref.verse).toBe(1);
  });
});

// -*- encoding: utf-8 -*-
//
// (c) Joshua Petrin 2025. All rights reserved.
//
// File creation date: 03 August 2025
// File creator: Joshua Petrin

import axios from "axios";
import { Esv } from "../../../app/bible/esv";
import { VerseRef } from "../../../app/types/bible_verse";
import { Book } from "../../../app/types/bible_book";

// Mock axios before requiring bookshelf
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Esv.prototype.fetch", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should fetch a single Bible verse successfully", async () => {
    const mockResponse = {
      data: {
        passages: ["In the beginning, God created the heavens and the earth."],
      },
    };

    mockedAxios.get.mockResolvedValue(mockResponse);

    const esv = new Esv();
    const ref = new VerseRef(Book.Genesis, 1, 1);
    const result = await esv.fetch(ref);

    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(1);
    expect(result[0].text).toEqual(
      "In the beginning, God created the heavens and the earth.",
    );
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
  });

  test("should include correct authorization header", async () => {
    const mockResponse = {
      data: {
        passages: ["Some verse text"],
      },
    };

    mockedAxios.get.mockResolvedValue(mockResponse);

    const esv = new Esv();
    const ref = new VerseRef(Book.Psalms, 23, 1);
    await esv.fetch(ref);

    expect(mockedAxios.get).toHaveBeenCalledWith(expect.any(String), {
      headers: {
        Authorization: expect.stringMatching(/^Token .+$/),
      },
      params: expect.any(Object),
    });
  });

  test("should trim whitespace from the returned verse", async () => {
    const mockResponse = {
      data: {
        passages: ["  The LORD is my shepherd.  \n  "],
      },
    };

    mockedAxios.get.mockResolvedValue(mockResponse);

    const esv = new Esv();
    const ref = new VerseRef(Book.Psalms, 23, 1);
    const result = await esv.fetch(ref);

    expect(result[0].text).toEqual("The LORD is my shepherd.");
  });

  test("should handle different book, chapter, and verse combinations", async () => {
    const mockResponse = {
      data: {
        passages: ["Jesus wept."],
      },
    };

    mockedAxios.get.mockResolvedValue(mockResponse);

    const esv = new Esv();
    const ref = new VerseRef(Book.John, 11, 35);
    const result = await esv.fetch(ref);

    expect(result[0].text).toEqual("Jesus wept.");
    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        params: expect.objectContaining({
          q: expect.stringMatching(/john 11:35/i),
        }),
      }),
    );
  });

  test("should handle API errors gracefully", async () => {
    const mockError = new Error("API request failed");
    mockedAxios.get.mockRejectedValue(mockError);

    const esv = new Esv();
    const ref = new VerseRef(Book.Genesis, 1, 1);

    await expect(esv.fetch(ref)).rejects.toThrow("API request failed");
  });
});

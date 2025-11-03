// -*- encoding: utf-8 -*-
//
// (c) Joshua Petrin 2025. All rights reserved.
//
// File creation date: 03 August 2025
// File creator: Joshua Petrin

const {
  test,
  expect,
  describe,
  beforeEach,
  afterEach,
} = require("@jest/globals");

// Mock axios before requiring bookshelf
jest.mock("axios");
const axios = require("axios");
const bookshelf = require("../../app/bookshelf.js");

describe("BibleTranslation.prototype.getVerse", () => {
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

    axios.get.mockResolvedValue(mockResponse);

    const result = await bookshelf.getEsv().getVerse("genesis", 1, 1);

    expect(result).toEqual(
      "In the beginning, God created the heavens and the earth.",
    );
    expect(axios.get).toHaveBeenCalledTimes(1);
  });

  test("should call ESV API with correct URL", async () => {
    const mockResponse = {
      data: {
        passages: ["For God so loved the world."],
      },
    };

    axios.get.mockResolvedValue(mockResponse);

    await bookshelf.getEsv().getVerse("john", 3, 16);

    expect(axios.get).toHaveBeenCalledWith(
      "https://api.esv.org/v3/passage/text",
      expect.any(Object),
    );
  });

  test("should include correct authorization header", async () => {
    const mockResponse = {
      data: {
        passages: ["Some verse text"],
      },
    };

    axios.get.mockResolvedValue(mockResponse);

    await bookshelf.getEsv().getVerse("psalm", 23, 1);

    expect(axios.get).toHaveBeenCalledWith(expect.any(String), {
      headers: {
        Authorization: expect.stringMatching(/^Token .+$/),
      },
      params: expect.any(Object),
    });
  });

  test("should include correct query parameters", async () => {
    const mockResponse = {
      data: {
        passages: ["Test verse"],
      },
    };

    axios.get.mockResolvedValue(mockResponse);

    await bookshelf.getEsv().getVerse("romans", 8, 28);

    const expectedParams = {
      q: "romans 8:28",
      "include-headings": "false",
      "include-footnotes": "false",
      "include-verse-numbers": "false",
      "include-short-copyright": "false",
      "include-passage-references": "false",
    };

    expect(axios.get).toHaveBeenCalledWith(expect.any(String), {
      headers: expect.any(Object),
      params: expectedParams,
    });
  });

  test("should format query string with lowercase book name", async () => {
    const mockResponse = {
      data: {
        passages: ["Verse text"],
      },
    };

    axios.get.mockResolvedValue(mockResponse);

    await bookshelf.getEsv().getVerse("Genesis", 2, 3);

    expect(axios.get).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        params: expect.objectContaining({
          q: "genesis 2:3",
        }),
      }),
    );
  });

  test("should trim whitespace from the returned verse", async () => {
    const mockResponse = {
      data: {
        passages: ["  The LORD is my shepherd.  \n  "],
      },
    };

    axios.get.mockResolvedValue(mockResponse);

    const result = await bookshelf.getEsv().getVerse("psalm", 23, 1);

    expect(result).toEqual("The LORD is my shepherd.");
  });

  test("should handle different book, chapter, and verse combinations", async () => {
    const mockResponse = {
      data: {
        passages: ["Jesus wept."],
      },
    };

    axios.get.mockResolvedValue(mockResponse);

    const result = await bookshelf.getEsv().getVerse("john", 11, 35);

    expect(result).toEqual("Jesus wept.");
    expect(axios.get).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        params: expect.objectContaining({
          q: "john 11:35",
        }),
      }),
    );
  });

  test("should handle API errors gracefully", async () => {
    const mockError = new Error("API request failed");
    axios.get.mockRejectedValue(mockError);

    await expect(
      bookshelf.getEsv().getVerse("genesis", 1, 1),
    ).rejects.toThrow("API request failed");
  });
});

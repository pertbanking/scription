// -*- encoding: utf-8 -*-
//
// (c) Joshua Petrin 2025. All rights reserved.
//
// File creation date: 03 August 2025
// File creator: Joshua Petrin

import axios from "axios";
import { getEsv } from "../../app/bookshelf";

// Mock axios before requiring bookshelf
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("EsvTranslation.prototype.fetchVerse", () => {
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

    const result = await getEsv().fetchVerse("genesis", 1, 1);

    expect(result).toEqual(
      "In the beginning, God created the heavens and the earth.",
    );
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
  });

  test("should call ESV API with correct URL", async () => {
    const mockResponse = {
      data: {
        passages: ["For God so loved the world."],
      },
    };

    mockedAxios.get.mockResolvedValue(mockResponse);

    await getEsv().fetchVerse("john", 3, 16);

    expect(mockedAxios.get).toHaveBeenCalledWith(
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

    mockedAxios.get.mockResolvedValue(mockResponse);

    await getEsv().fetchVerse("psalm", 23, 1);

    expect(mockedAxios.get).toHaveBeenCalledWith(expect.any(String), {
      headers: {
        Authorization: expect.stringMatching(/^Token .+$/),
      },
      params: expect.any(Object),
    });
  });

  test("should format query string with lowercase book name", async () => {
    const mockResponse = {
      data: {
        passages: ["Verse text"],
      },
    };

    mockedAxios.get.mockResolvedValue(mockResponse);

    await getEsv().fetchVerse("Genesis", 2, 3);

    expect(mockedAxios.get).toHaveBeenCalledWith(
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

    mockedAxios.get.mockResolvedValue(mockResponse);

    const result = await getEsv().fetchVerse("psalm", 23, 1);

    expect(result).toEqual("The LORD is my shepherd.");
  });

  test("should handle different book, chapter, and verse combinations", async () => {
    const mockResponse = {
      data: {
        passages: ["Jesus wept."],
      },
    };

    mockedAxios.get.mockResolvedValue(mockResponse);

    const result = await getEsv().fetchVerse("john", 11, 35);

    expect(result).toEqual("Jesus wept.");
    expect(mockedAxios.get).toHaveBeenCalledWith(
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
    mockedAxios.get.mockRejectedValue(mockError);

    await expect(getEsv().fetchVerse("genesis", 1, 1)).rejects.toThrow(
      "API request failed",
    );
  });
});

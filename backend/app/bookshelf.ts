// -*- encoding: utf-8 -*-
//
// (c) Joshua Petrin 2025. All rights reserved.
//
// File creation date: 03 August 2025
// File creator: Joshua Petrin

import dotenv from "dotenv";
import axios, { AxiosResponse } from "axios";

dotenv.config();

const ESV_TOKEN = process.env.ESV_API_TOKEN;
const ESV_API_URL = "https://api.esv.org/v3/passage/html";

if (!ESV_TOKEN) {
  throw new Error(
    "ESV_API_TOKEN environment variable is required. Please set it in your .env file.",
  );
}

/**
 * Interface for ESV API response data
 */
interface EsvApiResponse {
  passages: string[];
  query: string;
  canonical: string;
  parsed: number[][];
  passage_meta: Array<{
    canonical: string;
    chapter_start: number[];
    chapter_end: number[];
    prev_verse: number;
    next_verse: number;
    prev_chapter: number[];
    next_chapter: number[];
  }>;
}

/**
 * Abstract base class for Bible translations
 */
abstract class BibleTranslation {
  /**
   * Get a verse from this particular translation of the Bible
   * @param book The book of the Bible
   * @param chapter The chapter of the given book
   * @param verse The verse of the given chapter
   * @returns The verse text as a string
   */
  abstract fetchVerse(
    book: string,
    chapter: number,
    verse: number,
  ): Promise<string>;
}

/**
 * ESV (English Standard Version) Bible translation implementation
 */
class EsvTranslation extends BibleTranslation {
  /**
   * Fetch a verse from the ESV API
   * @param book The book of the Bible
   * @param chapter The chapter of the given book
   * @param verse The verse of the given chapter
   * @returns The verse text as a string
   */
  async fetchVerse(
    book: string,
    chapter: number,
    verse: number,
  ): Promise<string> {
    const query = `${book.toLowerCase()} ${chapter}:${verse}`;

    // TODO: Need to use the peripheral data (i.e. footnotes) to create breadcrumbs
    // TODO: Do we want this to await?
    const response: AxiosResponse<EsvApiResponse> = await axios.get(
      ESV_API_URL,
      {
        headers: { Authorization: `Token ${ESV_TOKEN}` },
        params: {
          q: query,
          "include-headings": "false",
          "include-footnotes": "true",
          "include-verse-numbers": "true",
          "include-short-copyright": "false",
          "include-passage-references": "true",
        },
      },
    );

    return response.data.passages[0].trim();
  }
}

/**
 * Factory function to get an ESV Bible translation instance
 * @returns An instance of EsvTranslation
 */
export const getEsv = (): BibleTranslation => {
  return new EsvTranslation();
};

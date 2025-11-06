// -*- encoding: utf-8 -*-
//
// (c) Joshua Petrin 2025. All rights reserved.
//
// File creation date: 06 November 2025
// File creator: Joshua Petrin

import dotenv from "dotenv";
import axios, { AxiosResponse } from "axios";
import { Bible } from "../bible/bible";
import { Verse, VerseRef, Footnote } from "../types/bible_verse";

dotenv.config();

const ESV_TOKEN = process.env.ESV_API_TOKEN;
const ESV_API_URL = "https://api.esv.org/v3/passage/html";

if (!ESV_TOKEN) {
  throw new Error(
    "ESV_API_TOKEN environment variable is required. Please set it in your .env file.",
  );
}

/**
 * ESV (English Standard Version) Bible translation implementation
 */
export class Esv extends Bible {
  /**
   * Fetch verses from the ESV API
   * @param start The starting verse reference
   * @param end The ending verse reference (optional, defaults to start)
   * @returns An array of Verse objects containing the text and metadata
   */
  async fetch(start: VerseRef, end?: VerseRef): Promise<Verse[]> {
    // Default end to start if not provided
    const endRef = end ?? start;

    const query = `${start.book} ${start.chapter}:${start.verse}-${endRef.chapter}:${endRef.verse}`;

    // TODO: Need to use the peripheral data (i.e. footnotes) to create breadcrumbs
    const response: AxiosResponse = await axios.get(ESV_API_URL, {
      headers: { Authorization: `Token ${ESV_TOKEN}` },
      params: {
        q: query,
        "include-headings": "false",
        "include-footnotes": "true",
        "include-verse-numbers": "true",
        "include-short-copyright": "false",
        "include-passage-references": "true",
      },
    });

    const text = response.data.passages[0].trim();

    // TODO: Parse response into individual verses
    // TODO: Parse footnotes from response
    const footnotes: Footnote[] = [];

    // For now, return a single verse with the full text
    return [new Verse(start, text, footnotes)];
  }

  /**
   * Check if a verse exists in the ESV translation
   * @param ref The verse reference to check
   * @returns True if the verse exists, false otherwise
   */
  exists(ref: VerseRef): boolean {
    // TODO: Implement proper validation logic
    // For now, just do basic sanity checks
    return ref.chapter > 0 && ref.verse > 0;
  }
}

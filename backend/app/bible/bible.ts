// -*- encoding: utf-8 -*-
//
// (c) Joshua Petrin 2025. All rights reserved.
//
// File creation date: 03 August 2025
// File creator: Joshua Petrin

import { VerseRef, Verse } from "../types/bible_verse";

/**
 * Abstract base class for Bible translations
 */
export abstract class Bible {
  /**
   * Fetch verses from this Bible
   * @param start The starting verse reference
   * @param end The ending verse reference (optional, defaults to start)
   * @returns An array of Verse objects containing the text and metadata
   */
  abstract fetch(start: VerseRef, end?: VerseRef): Promise<Verse[]>;

  /**
   * Check if a verse exists in this Bible translation
   * @param ref The verse reference to check
   * @returns True if the verse exists, false otherwise
   */
  abstract exists(ref: VerseRef): boolean;
}

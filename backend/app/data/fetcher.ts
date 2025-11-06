#!/usr/bin/env ts-node
// -*- encoding: utf-8 -*-
//
// (c) Joshua Petrin 2025. All rights reserved.
//
// File creation date: 03 August 2025
// File creator: Joshua Petrin

import { getEsv } from "../bookshelf";

/**
 * Command-line script to fetch a book of the Bible
 * Usage: ts-node fetcher.ts <book>
 * Example: ts-node app/fetcher.ts genesis 1 1
 */

async function main() {
  const args = process.argv.slice(2);

  if (args.length < 3) {
    console.error("Usage: ts-node app/fetcher.ts <book> <chapter> <verse>");
    console.error("Example: ts-node app/fetcher.ts genesis 1 1");
    process.exit(1);
  }

  const book = args[0];
  const chapter = parseInt(args[1], 10);
  const verse = parseInt(args[2], 10);

  if (isNaN(chapter) || isNaN(verse)) {
    console.error("Error: Chapter and verse must be valid numbers");
    process.exit(1);
  }

  try {
    const esv = getEsv();
    const verseText = await esv.fetchVerse(book, chapter, verse);
    console.log(`\n${book} ${chapter}:${verse}`);
    console.log(verseText);
    console.log();
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error fetching verse: ${error.message}`);
    } else {
      console.error("An unknown error occurred");
    }
    process.exit(1);
  }
}

main();

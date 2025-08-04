// -*- encoding: utf-8 -*-
//
// (c) Joshua Petrin 2025. All rights reserved.
//
// File creation date: 03 August 2025
// File creator: Joshua Petrin

"use strict";

const axios = require("axios");

const ESV_TOKEN = "blah";
const ESV_API_URL = "https://api.esv.org/v3/passage/text";

class BibleTranslation {
  constructor() {
  }
};

/**
 * Get a verse from this particular translation of the Bible
 * @param {string} book The book of the Bible
 * @param {int} chapter The chapter of the given book
 * @param {int} verse The verse of the given chapter
 */
BibleTranslation.prototype.getVerse = async (book, chapter, verse) => {
  const query = `${book.toLowerCase()} ${chapter}:${verse}`;

  // TODO: Need to use the peripheral data (i.e. footnotes) to create breadcrumbs
  // TODO: Do we want this to await?
  let response = await axios.get(ESV_API_URL, {
      headers: { "Authorization": `Token ${ESV_TOKEN}` },
      params: {
        "q": query,
        "include-headings": "false",
        "include-footnotes": "false",
        "include-verse-numbers": "false",
        "include-short-copyright": "false",
        "include-passage-references": "false",
      }
    });
  
  return response.data["passages"][0].strip();
};

const getEsv = () => {
  return new BibleTranslation();
};

module.exports = { getEsv };

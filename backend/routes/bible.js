// -*- encoding: utf-8 -*-
//
// (c) Joshua Petrin 2025. All rights reserved.
//
// File creation date: 06 July 2025
// File creator: Joshua Petrin

const express = require("express");
const router = express.Router();
const bible = require("../bible/esv.json");

router.get("/", (req, res) => {
  const { book, chapter, verse } = req.query;

  if (!book || !chapter || !verse) {
    return res.status(400).json({ error: "Missing book, chapter, or verse" });
  }

  const bookToken = book.replace(/[^a-zA-z0-9_]/g, "").toLowerCase();
  const otBookData = bible.bible.old_testament[bookToken];
  const ntBookData = bible.bible.new_testament[bookToken];
  if (!otBookData && !ntBookData) {
    return res.status(404).json({ error: `Book "${book}" not found.` });
  }

  const bookData = otBookData ? otBookData : ntBookData;

  const chapterToken = parseInt(chapter);
  const chapterData = bookData[chapterToken];
  if (!chapterData) {
    return res
      .status(404)
      .json({ error: `Chapter "${chapter}" not found in ${book}.` });
  }

  const verseToken = parseInt(verse);
  const verseText = chapterData.chapter[verseToken];
  if (!verseText) {
    return res
      .status(404)
      .json({ error: `Verse "${verse}" not found in ${book} ${chapter}.` });
  }

  const reference = `${book} ${chapter}:${verse}`;
  res.json({ ref: reference, text: verseText });
});

module.exports = router;

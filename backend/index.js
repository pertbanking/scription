// -*- encoding: utf-8 -*-
//
// (c) Joshua Petrin 2025. All rights reserved.
//
// File creation date: 06 July 2025
// File creator: Joshua Petrin

const express = require("express");
const path = require("path");
const bibleRoute = require("./routes/bible.js");

const app = express();
const PORT = process.env.PORT || 5000;

// API route
app.use("/api/v1/bible", bibleRoute);

// Serve React static files
// app.use(express.static(path.join(__dirname, "../frontend/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
// });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

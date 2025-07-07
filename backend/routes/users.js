// -*- encoding: utf-8 -*-
//
// (c) Joshua Petrin 2025. All rights reserved.
//
// File creation date: 06 July 2025
// File creator: Joshua Petrin

var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/users", function (req, res, next) {
  res.send({
    user: "Oreck E. Vacuum",
    id: 8008135,
    sex: "none",
  });
});

module.exports = router;

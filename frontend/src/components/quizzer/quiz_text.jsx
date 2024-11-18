// -*- encoding: utf-8 -*-
//
// (c) Joshua Petrin 2024. All rights reserved.
//
// File creation date: 13 November 2024
// File creator: Joshua Petrin

import React from "react";

const QuizText = ({ title, children }) => {
  return (
    <div className="quizzer text">
      <h2 className="title">{title}</h2>
      <div className="content">{children}</div>
    </div>
  );
};

export default QuizText;

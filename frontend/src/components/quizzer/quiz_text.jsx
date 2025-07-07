// -*- encoding: utf-8 -*-
//
// (c) Joshua Petrin 2025. All rights reserved.
//
// File creation date: 06 July 2025
// File creator: Joshua Petrin

const QuizText = ({ text, userGuesses }) => {
  const textByWord = text.split(/\s+/);
  const expectedInput = textByWord
    .map((word) => word[0]?.toLowerCase())
    .join("");

  // construct the display elements from the user guesses and the text
  const displayElements = textByWord.map((word, idx) => {
    if (userGuesses.length <= idx) {
      return "";
    } else {
      const isCorrect = userGuesses[idx] === expectedInput[idx];
      return (
        <span
          key={idx}
          className={
            isCorrect
              ? "has-text-success"
              : "has-text-danger has-text-weight-bold"
          }
        >
          {word + " "}
        </span>
      );
    }
  });

  return <div>{displayElements}</div>;
};

export default QuizText;

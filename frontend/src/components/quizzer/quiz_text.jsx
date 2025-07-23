// -*- encoding: utf-8 -*-
//
// (c) Joshua Petrin 2025. All rights reserved.
//
// File creation date: 06 July 2025
// File creator: Joshua Petrin

const RenderedWord = ({word, prefix, postfix, className}) => {
  // TODO: Make prettier
  return (<>
      {prefix? <sup>{prefix}</sup> : ""}
      <span className={className}>{word}</span>
      {postfix? <sup>{postfix}</sup> : ""}
    </>);
}

const makeRenderedWords = (text, answerKey) => {
  const getNextSplit = (currIdx) => {
    // filter the first spaces
    while (text[currIdx] === ' ') {
      currIdx++;
    }

    // index the prefix
    const prefixStart = currIdx;
    if (text[currIdx] === '{') {
      currIdx = 1 + text.indexOf('}', currIdx);
    }
    const prefix = (prefixStart === currIdx) ? "" : text.substring(prefixStart+1, currIdx-1);

    // the second spaces
    while (text[currIdx] === ' ') {
      currIdx++;
    }

    // index the actual word
    const wordStart = currIdx;
    while (currIdx < text.length && text[currIdx].search(/[a-zA-Z0-9]/) !== -1) {
      currIdx++;
    }
    const word = text.substring(wordStart, currIdx);

    // return the word, the prefix, and a stand-in for the postfix
    return [[word, prefix, ''], currIdx];
  }

  let words = [];

  // iterate through the text
  let strIdx = 0;
  let wordIdx = 0;
  while (wordIdx < answerKey.length && strIdx < text.length) {
    const [elem, newStrIdx] = getNextSplit(strIdx);
    strIdx = newStrIdx;

    if (elem !== "") {
      const [word, prefix, postfix] = elem;
      const isAnswerCorrect = answerKey[wordIdx].toLowerCase() === word[0].toLowerCase();
      words.push(
        <RenderedWord
          word={word}
          prefix={prefix}
          postfix={postfix}
          className={isAnswerCorrect ? "has-text-success" : "has-text-danger"}
          key={wordIdx} />
      );
    }

    wordIdx++;
  }

  return words;
}

const makeAnswerKey = (sanitizedText) => {
  const textByWord = sanitizedText.split(/\s+/);
  return textByWord.map((word) => word[0]?.toLowerCase());
}

const QuizText = ({ text, userGuesses }) => {

  // everything between braces is a prefix
  const sanitizedText = text.replace(/{.?}/g, "");

  // create the answer key
  const answerKey = makeAnswerKey(sanitizedText);

  // render the words
  const renderedWords = makeRenderedWords(text, answerKey);

  console.log("Answer key length =", answerKey.length);
  console.log("Rendered words length =", renderedWords.length);

  // construct the display elements from the user guesses and the text
  const displayElements = answerKey.map((answer, idx) => {
    if (userGuesses.length <= idx) {
      return "";
    } else {
      const isCorrect = userGuesses[idx] === answer;
      // renderedWords[idx].className = isCorrect ? "has-text-success" : "has-text-danger has-text-weight-bold"
      // renderedWords[idx].key = idx
      return renderedWords[idx]
    }
  });

  return <>{displayElements}</>;
};

export default QuizText;

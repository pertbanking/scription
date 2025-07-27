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
      <span> </span>
    </>);
}

class WordComponent {
  constructor(prefix, word, trailingPunctuation, postfix) {
    this.prefix = prefix;
    this.word = word;
    this.trailingPunctuation = trailingPunctuation;
    this.postfix = postfix;
  }
}

const getNextSplit = (text, currIdx) => {
  // filter the first spaces/punctuation
  while (currIdx < text.length && text[currIdx].search(/[a-zA-Z0-9{}]/) === -1) {
    currIdx++;
  }

  // index the prefix
  const prefixStart = currIdx;
  if (text[currIdx] === '{') {
    currIdx = 1 + text.indexOf('}', currIdx);
  }
  const prefix = (prefixStart === currIdx) ? "" : text.substring(prefixStart+1, currIdx-1);

  // filter the second set of spaces/punctuation
  while (currIdx < text.length && text[currIdx].search(/[a-zA-Z0-9]/) === -1) {
    currIdx++;
  }

  // index the actual word
  const wordStart = currIdx;
  while (currIdx < text.length && text[currIdx].search(/[^a-zA-Z0-9]/) === -1) {
    currIdx++;
  }

  const word = text.substring(wordStart, currIdx);

  // get trailing punctuation
  const puncStart = currIdx;
  while (currIdx < text.length && text[currIdx].search(/[ -]/) === -1) {
    currIdx++;
  }

  const trailingPunctuation = text.substring(puncStart, currIdx);

  return [new WordComponent(prefix, word, trailingPunctuation, ''), currIdx];
}

const QuizText = ({ text, userGuesses }) => {
  // render the words
  let words = [];

  // iterate through the text
  let strIdx = 0;
  let wordIdx = 0;
  while (wordIdx < userGuesses.length && strIdx < text.length) {
    const [component, newStrIdx] = getNextSplit(text, strIdx);
    strIdx = newStrIdx;

    const isAnswerCorrect = userGuesses[wordIdx].toLowerCase() === component.word[0].toLowerCase();
    const word = (strIdx === text.length || wordIdx !== userGuesses.length - 1)
                  ? component.word + component.trailingPunctuation
                  : component.word;
    words.push(
      <RenderedWord
        word={word}
        prefix={component.prefix}
        postfix={component.postfix}
        className={isAnswerCorrect ? "has-text-success" : "has-text-danger"}
        key={wordIdx} />
    );

    wordIdx++;
  }

  // put a space between each word
  return <>{words}</>;
};

export default QuizText;

/// -*- encoding: utf-8 -*-
///
/// (c) Joshua Petrin, 2024. All rights reserved.
///
/// File creation date: 13 October 2024
/// File creator: Joshua Petrin

import { useSelector, useDispatch } from "react-redux";
import { appendUserInputEntry } from "../../state/game_state";
import QuizText from "./quiz_text";
// import QuizSidebar from "./quiz_sidebar";

const Quizzer = () => {
  const passageRef = useSelector((state) => state.passage.reference);
  const passageText = useSelector((state) => state.passage.text);
  const userInputIndex = useSelector((state) => state.userInput.index);
  const userInputs = useSelector((state) => state.userInput.entries);

  const dispatch = useDispatch();

  const doInput = (e) => {
    dispatch(
      appendUserInputEntry({ index: userInputIndex, value: e.target.value[0] }),
    );
    e.target.value = "";
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <h1 className="title is-3">Scripture Memory Game</h1>

          <div className="box">
            <p className="has-text-grey">Reference:</p>
            <p className="subtitle is-5">{passageRef}</p>
          </div>

          <div className="field">
            <div className="control">
              <input
                type="text"
                className="input"
                placeholder="Type the first letter of each word..."
                onChange={doInput}
              />
            </div>
          </div>

          <QuizText text={passageText} userGuesses={userInputs} />

          {/* <div className="buttons mt-4">
            <button
              className="button is-info"
              onClick={() => dispatch({ type: "SET_INPUT_INDEX", payload: userInputIndex + 1 })}
            >
              Next Attempt
            </button>
          </div> */}
        </div>
      </div>
      {/* <QuizSidebar /> */}
    </>
  );
};

export default Quizzer;

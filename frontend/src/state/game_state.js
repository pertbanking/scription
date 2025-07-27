import { configureStore, createSlice } from "@reduxjs/toolkit";

const passageSlice = createSlice({
  name: "passage",
  initialState: {
    reference: "John 1:1",
    text: "{1} In the beginning was the Word, and the Word was with God, and the Word was God. {2} He was in the beginning with God.",
  },
  reducers: {
    setPassage: (state, action) => {
      state.reference = action.payload.reference;
      state.text = action.payload.text;
    },
  },
});

const userInputSlice = createSlice({
  name: "userInput",
  initialState: {
    index: 0,
    entries: [],
  },
  reducers: {
    appendUserInputEntry: (state, action) => {
      const { index, value } = action.payload;
      state.index = index + 1;
      state.entries.push(value);
    },
  },
});

export const { setPassage } = passageSlice.actions;
export const { appendUserInputEntry } = userInputSlice.actions;

const store = configureStore({
  reducer: {
    passage: passageSlice.reducer,
    userInput: userInputSlice.reducer,
  },
});

export default store;

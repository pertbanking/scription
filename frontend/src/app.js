// -*- encoding: utf-8 -*-
//
// (c) Joshua Petrin, 2024. All rights reserved.
//
// File creation date: 14 October 2024
// File creator: Joshua Petrin

import { Provider } from "react-redux";

import Scription from "./components/index";
import store from "./state/game_state";
import logo from "./images/logo-circled-248.png";

function App() {
  return (
    <Provider store={store}>
      <Scription />
    </Provider>
  );
}

export default App;

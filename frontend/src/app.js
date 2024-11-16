// -*- encoding: utf-8 -*-
//
// (c) Joshua Petrin, 2024. All rights reserved.
//
// File creation date: 14 October 2024
// File creator: Joshua Petrin

'use strict';

// import * as BibleParser from './bible_parser';

import NavBar from './components/nav_bar'
import SubjectFrame from './components/index'
import logo from './images/logo-circled-248.png';

function App() {


  return (
    <>
      <NavBar logo={logo} text="John 1:1-18" />
      <SubjectFrame />
    </>
  );
}

export default App;

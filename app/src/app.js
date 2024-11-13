// -*- encoding: utf-8 -*-
//
// (c) Joshua Petrin, 2024. All rights reserved.
//
// File creation date: 14 October 2024
// File creator: Joshua Petrin

// import DropdownMenu from './elements/dropdown'
import NavBar from './components/nav_bar'
import SubjectFrame from './components/index'
import logo from './logo-750.png';

function App() {
  return (
    <div>
      <NavBar logo={logo} text="John 1:1-18" />
      <SubjectFrame />
    </div>
  );
}

export default App;

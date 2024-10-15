/// -*- encoding: utf-8 -*-
///
/// (c) Joshua Petrin, 2024. All rights reserved.
///
/// File creation date: 14 October 2024
/// File creator: Joshua Petrin

// import DropdownMenu from './elements/dropdown'
import NavBar from './components/nav_bar'
import logo from './logo-750.png';
import './app.css';

function App() {
  return (
    <div>
      <header>
      </header>
      <NavBar logo={logo} title="John 1:1-18" />
      <div className="main frame">
        <div className="main page">
          hello
        </div>
      </div>
    </div>
  );
}

export default App;

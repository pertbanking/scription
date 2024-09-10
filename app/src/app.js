// import DropdownMenu from './elements/dropdown'
import TopBar from './elements/top_bar'
// import logo from './logo-750.png';
import './app.css';

function App() {
  return (
    <div className="app">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" width="300" height="300" />
        <p>
          Welcome to Scription!
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <TopBar title="John 1:1-18" />
      <div className="main frame">
        <div className="main page">
          hello
        </div>
      </div>
    </div>
  );
}

export default App;

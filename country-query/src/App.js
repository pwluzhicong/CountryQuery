import logo from './logo.svg';
import './App.css';

// import CountrySelector from './CountrySelector';
import ContinentSelector from './ContinentSelector';
// import ListCountries from './ListCountries';

// import WorldMap from './WorldMap';
function App() {
  return (
    <div className="App">
      <header className="App-header">
      {/* <ContinentSelector/> */}
     <ContinentSelector />
      {/* <WorldMap /> */}
        {/* <WorldMap></WorldMap> */}
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
    </div>
  );
}

export default App;

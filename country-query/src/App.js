import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';

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

      </header>
    </div>
  );
}

export default App;

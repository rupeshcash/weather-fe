// App.js
import React, {useState} from 'react';
import './App.css';
import SearchBar from './components/searchbar';
import Table from './components/PredictionTable';

function App() {
  const [searchResult, setSearchResult] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchedCity, setSearchedCity] = useState('');

  const handleSearch = (query) => {
    
    fetch(`http://localhost:8080/api/v1/weather?city=${query}`)
      .then(response => response.json())
      .then(data => {
        if (data.code === 200) {
          setSearchResult(data.data); 
          setErrorMessage('');
          setSearchedCity(query);
        } else {
          setErrorMessage(data.data.errorDescription || 'An error occurred.');
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setErrorMessage('An error occurred.');
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather Predictor!</h1>
        <div style={{ textAlign: 'center' }}>
          <SearchBar onSearch={handleSearch} />
        </div>
        {searchedCity && <p>Searched City: {searchedCity}</p>}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <Table data={searchResult} />
      </header>
    </div>
  );
}

export default App;

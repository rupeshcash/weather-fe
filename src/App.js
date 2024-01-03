// App.js
import React, {useState} from 'react';
import './App.css';
import SearchBar from './components/searchbar';
import Table from './components/PredictionTable';

function App() {
  const [searchResult, setSearchResult] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleSearch = (query) => {
    // Make API request when the user clicks "Search"
    fetch(`http://localhost:8080/api/v1/weather?city=${query}`)
      .then(response => response.json())
      .then(data => {
        if (data.code === 200) {
          setSearchResult(data.data); // Update state with the search result
          setErrorMessage('');
        } else {
          setErrorMessage(data.message || 'An error occurred.');
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setErrorMessage('An error occurred.');
        // Handle error appropriately (e.g., show an error message)
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello, World!</h1>
        <div style={{ textAlign: 'center' }}>
          <SearchBar onSearch={handleSearch} />
        </div>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <Table data={searchResult} />
      </header>
    </div>
  );
}

export default App;

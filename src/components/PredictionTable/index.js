import React from 'react';
import './index.css';


const Table = ({ data }) => {
    if (data.length === 0) {
      return <p>No results found.</p>;
    }
  
    return (
      <table className="data-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Min Temperature</th>
            <th>Max Temperature</th>
            <th>Prediction</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.dt}>
              <td>{item.dt}</td>
              <td>{item.temp_min}</td>
              <td>{item.temp_max}</td>
              <td>{item.prediction}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default Table;
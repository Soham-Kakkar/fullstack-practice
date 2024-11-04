import React, { useEffect, useState } from 'react';
function App() {
  return(
    <div>
      <h2>Edit This JSON:</h2>
      <Data/>
    </div>
  );
}
function Data() {
  const [data, setData] = useState(null); // Use null as initial state for better type checking
  const [error, setError] = useState(''); // State to hold any error messages
  const API_URL = process.env.REACT_APP_API_URL;
  useEffect(() => {
    fetch(`${API_URL}/users`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse response as JSON
      })
      .then(data => setData(data)) // Set the parsed JSON data
      .catch(error => setError(error.message)); // Handle errors
  }, [API_URL]);

  // Handle loading and error states
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return <pre contentEditable>{JSON.stringify(data, null, 2)}</pre>; // Pretty-print the JSON data
}

export default App;
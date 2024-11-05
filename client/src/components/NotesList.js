import { useState, useEffect } from 'react'

export function NotesList() {
    const [data, setData] = useState(null); 
    const [error, setError] = useState(''); 
    const API_URL = process.env.REACT_APP_API_URL;
    const userID = "example-user";

    useEffect(() => {
      fetch(`${API_URL}/users/${userID}/notes`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json(); 
        })
        .then(data => setData(data)) 
        .catch(error => setError(error.message)); 
    }, [API_URL, userID]);

    if (error) {
        return (
            <div id="noteslist">
                <p>Error: {error}</p>
            </div>
        );
    }

    if (!data) {
        return (
            <div id="noteslist">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div id="noteslist">
            <ul>
                {data.map(note => <li key={note.id}>{note.title}</li>)}
            </ul>
        </div>
    );
}
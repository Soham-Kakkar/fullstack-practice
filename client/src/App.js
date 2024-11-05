import React, { useEffect, useState } from 'react';
import AuthPopup from './components/AuthPopup';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setIsAuthenticated(true);
  }, []);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);  // Update the state to authenticated
  };

  return (
    <>
      <h1>MyNotes</h1>
      {isAuthenticated ? (
        <div>Welcome Back!</div>
      ) : (
        <AuthPopup onAuthSuccess={handleAuthSuccess} />
      )}
    </>
  );
}

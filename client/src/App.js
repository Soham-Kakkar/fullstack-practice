import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import AuthPopup from './components/AuthPopup';
import AccountView from './components/AccountView';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token'); // Replace 'token' with your actual token key
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUsername(decoded.username);
        setEmail(decoded.email);
      } catch (error) {
        console.error('Invalid token:', error);
      }
    }
  }, []);

  const handleAuthSuccess = (token) => {
    localStorage.setItem('token', token);
    try {
      const decoded = jwtDecode(token);
      setUsername(decoded.username);
      setEmail(decoded.email);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Invalid token:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUsername('');
    setEmail('');
    setIsAuthenticated(false);
    console.log('Logged Out');
  };

  return (
    <>
      <h1>MyNotes</h1>
      {isAuthenticated ? (
        <><div>Welcome Back!</div>
        <AccountView username={username} email={email} />
        <button onClick={handleLogout}>Logout</button></>
      ) : (
        <AuthPopup onAuthSuccess={handleAuthSuccess} />
      )}
    </>
  );
}

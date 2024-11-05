import React, { useState } from 'react';
import { login } from  '../api';

import { jwtDecode } from 'jwt-decode';

export default function LoginForm({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const loginResponse = await login(email, password);
      onLoginSuccess(loginResponse.token);
      console.log(`${jwtDecode(loginResponse.token).username} - Log In successful`);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="auth-form">
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}

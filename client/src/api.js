import { jwtDecode } from 'jwt-decode';

const API_URL = process.env.REACT_APP_API_URL;

export async function register( username, email, password ) {
    const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.message || 'Registration failed');

      return data;
}

export async function login( email, password ) {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.message || 'Login failed');

      return data;
}

export function decodeToken(token) {
    return jwtDecode(token);
}

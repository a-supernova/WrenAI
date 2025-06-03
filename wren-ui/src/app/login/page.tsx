"use client"

import axios from 'axios';
import { useState } from 'react';
   
export default function SignupForm() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/login', { email, password });
      window.location.href = "/home/dashboard";
    } catch (err) {
      console.error(err);
      alert('Invalid credentials');
    }
  };

  return (
    <div style={{
      display: 'grid',
      placeContent: 'center',
    }}>
      <div style={{
        marginTop: '50%',
        width: "50%",
        height: "50%"
    }}>
        <form onSubmit={handleSubmit} method="POST">
          <div>
            <label htmlFor="email">Email:</label>
            <input id="email" name="email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input id="password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  )
}
"use client"

import axios from 'axios';
import { redirect } from 'next/navigation';
import { useState } from 'react';
   
export default function SignupForm() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/login', { email, password });
      //localStorage.setItem('session', data.token);
      redirect("/home/dashboard")
    } catch (err) {
      console.error(err);
      alert('Invalid credentials');
    }
  };

  return (
    <form onSubmit={handleSubmit} method="POST">
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit">Entrar</button>
    </form>
  )
}
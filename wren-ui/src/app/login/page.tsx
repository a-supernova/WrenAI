"use client"

import axios from 'axios';
import { useState } from 'react';
import { Alert, Typography, Form, Row, Col, Button } from 'antd';
   
export default function SignupForm() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = async (e) => {
    //e.preventDefault();
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
        width: "100%",
        height: "50%"
    }}>

        <Typography.Title level={2} style={{ textAlign: 'center' }}>
          Login
        </Typography.Title>
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          style={{ marginBottom: 24 }}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Por favor, insira seu email!' },
              { type: 'email', message: 'Insira um email válido!' },
            ]}
          >
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: 8 }}
            />
          </Form.Item>
          <Form.Item
            label="Senha"
            name="password"
            rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}
          >
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: 8 }}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Entrar
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
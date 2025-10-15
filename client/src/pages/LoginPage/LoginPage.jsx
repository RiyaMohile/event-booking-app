import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../api/api';
import styles from './LoginPage.module.css';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data));
      alert('Login successful!');
      navigate('/'); 
    } catch (err) {
      if (err.response && err.response.status === 401) {
        alert('Account not found. Please register first.');
        navigate('/register'); 
      } else {
        alert('Login failed. Please check credentials.');
      }
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Login</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          required
          type="email"
          placeholder="Email"
          className={styles.input}
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          required
          type="password"
          placeholder="Password"
          className={styles.input}
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit" className={styles.button}>
          Login
        </button>
      </form>

     
      <p className={styles.linkText}>
        Don’t have an account?{' '}
        <Link to="/register" className={styles.link}>
          Register here
        </Link>
      </p>
    </div>
  );
}

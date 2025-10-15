import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import styles from './AdminDashboard.module.css';

export default function AdminLoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', form);

      if (res.data.role !== 'admin') {
        alert('You are not authorized as admin.');
        return;
      }

      
      localStorage.setItem('adminToken', res.data.token);
      navigate('/admin'); 
    } catch (err) {
      console.error(err);
      alert('Login failed. Check your email/password.');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Admin Login</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="email"
          placeholder="Email"
          required
          className={styles.input}
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          required
          className={styles.input}
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit" className={styles.button}>Login</button>
      </form>
    </div>
  );
}

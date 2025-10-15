import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../api/api';
import styles from './RegisterPage.module.css';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/register', form);
      alert('Registration successful! Please login.');
      navigate('/login'); 
    } catch (err) {
      alert('Registration failed. Try again.');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Register</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          required
          placeholder="Name"
          className={styles.input}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
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
          Register
        </button>
      </form>

    
      <p className={styles.linkText}>
        Already have an account?{' '}
        <Link to="/login" className={styles.link}>
          Login here
        </Link>
      </p>
    </div>
  );
}

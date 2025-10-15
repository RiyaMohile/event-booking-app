// src/components/CheckoutForm.js
import React, { useState } from 'react';
import styles from './CheckoutForm.module.css';

export default function CheckoutForm({ onSubmit }) {
  const [form, setForm] = useState({ name: '', email: '', mobile: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
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
        placeholder="Mobile"
        className={styles.input}
        value={form.mobile}
        onChange={(e) => setForm({ ...form, mobile: e.target.value })}
      />
      <button type="submit" className={styles.button}>
        Confirm Booking
      </button>
    </form>
  );
}

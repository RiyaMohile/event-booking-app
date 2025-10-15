import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../api/api';
import CheckoutForm from '../../components/CheckoutForm/CheckoutForm';
import styles from './CheckoutPage.module.css';

export default function CheckoutPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { event, quantity } = state || {};

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login first!');
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = async (form) => {
    try {
      const token = localStorage.getItem('token');
      const res = await api.post(
        '/bookings',
        { eventId: event._id, quantity, ...form },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate(`/success/${res.data._id}`);
    } catch (err) {
      console.error(err);
      alert('Booking failed. Please try again.');
    }
  };

  if (!event) return <div className={styles.container}>No event selected</div>;

  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        <h2>Checkout - {event.title}</h2>
        <CheckoutForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../../api/api';
import styles from './EventDetailsPage.module.css';

export default function EventDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    api.get(`/events/${id}`)
      .then(res => setEvent(res.data))
      .catch(err => console.error('Error fetching event:', err));
  }, [id]);

  const handleBook = () => {
    navigate('/checkout', { state: { event, quantity } });
  };

  if (!event) return <div className={styles.loading}>Loading...</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.container}>
      <img
        src={event.image || 'https://via.placeholder.com/600x300'}
        alt={event.title}
        className={styles.image}
      />
      <h1 className={styles.title}>{event.title}</h1>
      <p className={styles.description}>{event.description}</p>
      <p className={styles.location}>Location: {event.location}</p>

      <div className={styles.controls}>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          min={1}
          className={styles.input}
        />
        <button onClick={handleBook} className={styles.button}>
          Book Now
        </button>
      </div>
    </motion.div>
  );
}

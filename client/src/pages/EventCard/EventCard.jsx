import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SeatAvailabilityBadge from '../../components/SeatAvailabilityBadge/SeatAvailabilityBadge';
import styles from './EventCard.module.css';

export default function EventCard({ event }) {
  const formattedDate = new Date(event.date).toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  return (
    <Link to={`/events/${event._id}`} className={styles.cardLink}>
      <motion.div whileHover={{ scale: 1.03 }} className={styles.card}>
        <img
          src={event.image || 'https://via.placeholder.com/400x200'}
          alt={event.title}
          className={styles.image}
        />
        <div className={styles.content}>
          <h3 className={styles.title}>{event.title}</h3>
          <p className={styles.location}>{event.location}</p>
          <p className={styles.date}>📅 {formattedDate}</p>
          <SeatAvailabilityBadge availableSeats={event.availableSeats} />
        </div>
      </motion.div>
    </Link>
  );
}

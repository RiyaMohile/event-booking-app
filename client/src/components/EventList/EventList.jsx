import React from 'react';
import EventCard from './EventCard';
import styles from './EventList.module.css';

export default function EventList({ events }) {
  return (
    <div className={styles.grid}>
      {events.map((event) => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  );
}

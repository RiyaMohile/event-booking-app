import React from "react";
import { motion } from "framer-motion";
import styles from "./EventCard.module.css";

const EventCard = ({ event }) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      className={styles.card}
    >
      <h2 className={styles.title}>{event.title}</h2>
      <p className={styles.description}>{event.description}</p>
      <p className={styles.date}>{new Date(event.date).toLocaleString()}</p>
      <p className={styles.seats}>Available Seats: {event.availableSeats}</p>
    </motion.div>
  );
};

export default EventCard;

import React from 'react';
import styles from './SeatAvailabilityBadge.module.css';

export default function SeatAvailabilityBadge({ availableSeats }) {
          let colorClass = styles.green;
          if 
            (availableSeats < 5) colorClass = styles.red;
          else if 
            (availableSeats < 20) colorClass = styles.orange;
      
      return (
        <span className={`${styles.badge} ${colorClass}`}>
              {availableSeats} seats left
        </span>
      );
}

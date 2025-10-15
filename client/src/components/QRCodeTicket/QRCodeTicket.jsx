import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import styles from './QRCodeTicket.module.css';

export default function QRCodeTicket({ bookingId }) {
  return (
    <div className={styles.container}>
      <QRCodeCanvas value={`Booking:${bookingId}`} size={200} />
    </div>
  );
}

import React from 'react';
import { useParams } from 'react-router-dom';
import QRCodeTicket from '../../components/QRCodeTicket/QRCodeTicket';
import styles from './BookingSuccessPage.module.css';

export default function BookingSuccessPage() {
  const { id } = useParams();

  return (
    <div className={styles.container}>
      <h1>Booking Confirmed!</h1>
      <p>Your booking ID: {id}</p>
      <QRCodeTicket bookingId={id} />
    </div>
  );
}

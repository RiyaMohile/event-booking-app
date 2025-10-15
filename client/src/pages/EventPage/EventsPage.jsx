import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import EventCard from '../EventCard/EventCard';
import styles from './EventsPage.module.css';

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [searchLocation, setSearchLocation] = useState('');
  const [searchDate, setSearchDate] = useState('');

  // Fetch events (with optional filters)
  const fetchEvents = async (filters = {}) => {
    try {
      const query = new URLSearchParams(filters).toString();
      const res = await api.get(`/events?${query}`);
      setEvents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchEvents({ location: searchLocation, date: searchDate });
  };

  return (
    <div className={styles.pageContainer}>
      <h2 className={styles.heading}>Upcoming Events</h2>

      {/* Search Form */}
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <input
          type="text"
          placeholder="Search by location..."
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
          className={styles.searchInput}
        />
        <input
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          className={styles.dateInput}
        />
        <button type="submit" className={styles.searchButton}>Search</button>
      </form>

      <div className={styles.container}>
        {events.length > 0 ? (
          events.map((event) => <EventCard key={event._id} event={event} />)
        ) : (
          <p className={styles.noEvents}>No events found</p>
        )}
      </div>
    </div>
  );
}

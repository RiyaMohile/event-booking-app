import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { setAuthToken } from '../../api/api';
import styles from './AdminDashboard.module.css';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    date: '',
    totalSeats: 0,
    price: 0,
    image: ''
  });
  const [editingId, setEditingId] = useState(null);

  const formRef = useRef(null); 

  const token = localStorage.getItem('adminToken');
  setAuthToken(token);

  useEffect(() => {
    if (!token) navigate('/admin-login');
    else setAuthToken(token);
  }, [token, navigate]);

  useEffect(() => {
    if (!token) return;
    api.get('/events')
      .then(res => setEvents(res.data))
      .catch(err => console.error('Error fetching events:', err));
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (editingId) {
        res = await api.put(`/events/${editingId}`, form);
        setEvents(events.map(ev => ev._id === editingId ? res.data : ev));
        setEditingId(null);
      } else {
        res = await api.post('/events', form);
        setEvents([...events, res.data]);
      }
      setForm({
        title: '',
        description: '',
        location: '',
        date: '',
        totalSeats: 0,
        price: 0,
        image: ''
      });
    } catch (err) {
      console.error(err);
      alert('Failed. Make sure you are logged in as admin.');
    }
  };

  const handleEdit = (event) => {
    setForm({
      title: event.title,
      description: event.description,
      location: event.location,
      date: event.date.split('T')[0],
      totalSeats: event.totalSeats,
      price: event.price,
      image: event.image || ''
    });
    setEditingId(event._id);

    
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    try {
      await api.delete(`/events/${id}`);
      setEvents(events.filter(ev => ev._id !== id));
    } catch (err) {
      console.error(err);
      alert('Failed to delete event.');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Admin Dashboard</h1>

      
      <form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
        <label>Title</label>
        <input
          required
          placeholder="Enter event title"
          className={styles.input}
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
        />

        <label>Description</label>
        <input
          required
          placeholder="Enter event description"
          className={styles.input}
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
        />

        <label>Location</label>
        <input
          required
          placeholder="Enter location"
          className={styles.input}
          value={form.location}
          onChange={e => setForm({ ...form, location: e.target.value })}
        />

        <label>Date</label>
        <input
          type="date"
          required
          className={styles.input}
          value={form.date}
          onChange={e => setForm({ ...form, date: e.target.value })}
        />

        <label>Total Seats</label>
        <input
          type="number"
          placeholder="Seats"
          className={styles.input}
          value={form.totalSeats}
          onChange={e => setForm({ ...form, totalSeats: Number(e.target.value) })}
        />

        <label>Price</label>
        <input
          type="number"
          placeholder="Price"
          className={styles.input}
          value={form.price}
          onChange={e => setForm({ ...form, price: Number(e.target.value) })}
        />

        <label>Image URL</label>
        <input
          placeholder="Enter image URL (optional)"
          className={styles.input}
          value={form.image}
          onChange={e => setForm({ ...form, image: e.target.value })}
        />

        <button type="submit" className={styles.button}>
          {editingId ? 'Update' : 'Add'}
        </button>
      </form>

      <div className={styles.grid}>
        {events.length > 0 ? events.map(event => (
          <div key={event._id} className={styles.card}>
            {event.image && <img src={event.image} alt={event.title} className={styles.cardImage} />}
            <h2 className={styles.cardTitle}>{event.title}</h2>
            <p className={styles.cardText}><strong>Description:</strong> {event.description}</p>
            <p className={styles.cardText}><strong>Location:</strong> {event.location}</p>
            <p className={styles.cardText}><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
            <p className={styles.cardText}><strong>Seats:</strong> {event.availableSeats}/{event.totalSeats}</p>
            <p className={styles.cardText}><strong>Price:</strong> ₹{event.price}</p>
            <div style={{ marginTop: '10px' }}>
              <button onClick={() => handleEdit(event)} className={styles.button}>Edit</button>
              <button onClick={() => handleDelete(event._id)} className={styles.button} style={{ background: 'red', marginLeft: '8px' }}>Delete</button>
            </div>
          </div>
        )) : <p className={styles.noData}>No events found.</p>}
      </div>
    </div>
  );
}

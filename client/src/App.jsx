import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import EventsPage from './pages/EventPage/EventsPage';
import EventDetailsPage from './pages/EventDetailsPage/EventDetailsPage';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage';
import BookingSuccessPage from './pages/BookingSuccessPage/BookingSuccessPage';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import AdminLoginPage from './pages/AdminDashboard/AdminLoginPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/:id" element={<EventDetailsPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/success/:id" element={<BookingSuccessPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin-login" element={<AdminLoginPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

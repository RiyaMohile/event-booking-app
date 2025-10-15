import Booking from '../models/Booking.js';
import Event from '../models/Event.js';

export const createBooking = async (req, res) => {
    const { eventId, quantity } = req.body;
    const event = await Event.findById(eventId);
    if (!event) 
        return res.status(404).json({ message: 'Event not found' });
    if (event.availableSeats < quantity) {
        return res.status(400).json({ message: 'Not enough seats available' });
    }
    event.availableSeats -= quantity;
    await event.save();
    const totalAmount = event.price * quantity;
    const booking = await Booking.create({
        user: req.user._id,
        event: eventId,
        quantity,
        totalAmount,
    });
    res.status(201).json(booking);
};
export const getUserBookings = async (req, res) => {
    const bookings = await Booking.find({ user:
        req.user._id }).populate('event');
        res.json(bookings);
    };
export const cancelBooking = async (req, res) => {
    const booking = await Booking.findById(req.params.id);
    if (!booking) 
        return res.status(404).json({ message: 'Booking not found' });
    booking.status = 'cancelled';
    await booking.save();
    const event = await Event.findById(booking.event);
    event.availableSeats += booking.quantity;
    await event.save();
    res.json({ message: 'Booking cancelled' });
};

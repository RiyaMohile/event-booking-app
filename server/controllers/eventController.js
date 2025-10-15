import Event from '../models/Event.js';

// Create Event
export const createEvent = async (req, res) => {
  try {
    const { title, description, location, date, totalSeats, price, image } = req.body;
    const event = await Event.create({
      title,
      description,
      location,
      date,
      totalSeats,
      availableSeats: totalSeats,
      price,
      image,
    });
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Events
export const getEvents = async (req, res) => {
  try {
    const { location, date } = req.query;
    let filter = {};
    if (location) filter.location = location;
    if (date) filter.date = { $gte: new Date(date) };
    const events = await Event.find(filter);
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Event by ID
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Event
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    Object.assign(event, req.body);
    const updated = await event.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Event
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    await event.deleteOne();
    res.json({ message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

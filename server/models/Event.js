import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true },
    description: { 
        type: String, 
        required: true },
    location: { 
        type: String, 
        required: true },
    date: { 
        type: Date, 
        required: true },
    totalSeats: { 
        type: Number, 
        required: true },
    price: { 
        type: Number, 
        required: true },
    image: { 
        type: String },
    availableSeats: { 
        type: Number, 
        required: true },
    }, 
    { timestamps: true });
    
export default mongoose.model('Event', eventSchema);
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/eventinfo', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define Event schema
const EventSchema = new mongoose.Schema({
  eventName: String,
  eventArea: String,
  guest: String,
  targetAudience: String,
  totalSeats: Number,
  eventDate: Date,
  payment: String,
  timing: String,
  additionalInfo: String
});

const Event = mongoose.model('Event', EventSchema);

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Redirect root route to /events
app.get('/', (req, res) => {
  res.redirect('/events');
});

// Fetch event data
app.get('/events', async (req, res) => {
  try {
    const events = await Event.find();
    res.render('events', { events });
  } catch (error) {
    res.status(500).send('Error fetching events: ' + error.message);
  }
});

const PORT = process.env.PORT || 4442;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

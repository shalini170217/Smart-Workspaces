const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Initialize Express app and body-parser
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection to the `eventinfo` database
mongoose.connect('mongodb://localhost:27017/eventinfo', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB:', err));

// Define a schema for the event info
const eventSchema = new mongoose.Schema({
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

// Create a model based on the schema
const Event = mongoose.model('Event', eventSchema);

// Handle the form submission
app.post('/submit', (req, res) => {
    const newEvent = new Event({
        eventName: req.body.eventName,
        eventArea: req.body.eventArea,
        guest: req.body.guest,
        targetAudience: req.body.targetAudience,
        totalSeats: req.body.totalSeats,
        eventDate: req.body.eventDate,
        payment: req.body.payment,
        timing: req.body.timing,
        additionalInfo: req.body.additionalInfo
    });

    // Save the event information to the database
    newEvent.save()
        .then(() => res.send('Event information saved successfully!'))
        .catch(err => res.status(400).send('Error saving data: ' + err));
});

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/event.html'); // Ensure this file path matches your HTML file's location
});

// Start the server
const port = 4890;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

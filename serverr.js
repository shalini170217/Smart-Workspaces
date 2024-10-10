const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

// Initialize Express app and body-parser
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection to the `registered` database
mongoose.connect('mongodb://localhost:27017/registered', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB:', err));

// Define a schema for the registration info
const registrationSchema = new mongoose.Schema({
    name: String,
    registrationNumber: String,
    eventName: String,
    department: String,
    currentYear: String,
    paymentTransactionId: String,
    collegeName: String
});

// Create a model based on the schema
const Registration = mongoose.model('Registration', registrationSchema);

// Handle the form submission
app.post('/submit', (req, res) => {
    const newRegistration = new Registration({
        name: req.body.name,
        registrationNumber: req.body.registrationNumber,
        eventName: req.body.eventName,
        department: req.body.department,
        currentYear: req.body.currentYear,
        paymentTransactionId: req.body.paymentTransactionId,
        collegeName: req.body.collegeName
    });

    // Save the registration information to the database
    newRegistration.save()
        .then(() => {
            // Redirect to a success page or another desired URL after saving
            res.send('registered');
        })
        .catch(err => res.status(400).send('Error saving data: ' + err));
});

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'register.html')); // Make sure to rename your HTML file accordingly
});

// Start the server
const port = 4555;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

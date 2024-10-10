const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Initialize Express app and body-parser
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection to the `studinfo` database
mongoose.connect('mongodb://localhost:27017/studinfo', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB:', err));

// Define a schema for the student info
const studentSchema = new mongoose.Schema({
    institute: String,
    email: String,
    studentName: String,
    registrationNumber: Number,
    password: String
});

// Create a model based on the schema
const Student = mongoose.model('Student', studentSchema);

// Handle the form submission
app.post('/submit', (req, res) => {
    const newStudent = new Student({
        institute: req.body.institute,
        email: req.body.email,
        studentName: req.body.studentName,
        registrationNumber: req.body.registrationNumber,
        password: req.body.password
    });

    // Save the student information to the database
    newStudent.save()
        .then(() => res.redirect('http://localhost:4555')) // Redirect to localhost:4555
        .catch(err => res.status(400).send('Error saving data: ' + err));
});

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/stud.html');
});

// Start the server
const port = 4223;  // Set the port to 4555
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

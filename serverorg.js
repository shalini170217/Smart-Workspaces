const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Initialize Express app and body-parser
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection to the `orginfo` database
mongoose.connect('mongodb://localhost:27017/orginfo', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB:', err));

// Define a schema for the organization info
const organizationSchema = new mongoose.Schema({
    institute: String,
    email: String,
    collegeCode: String,
    password: String
});

// Create a model based on the schema
const Organization = mongoose.model('Organization', organizationSchema);

// Handle the form submission
app.post('/submit', (req, res) => {
    const newOrganization = new Organization({
        institute: req.body.institute,
        email: req.body.email,
        collegeCode: req.body.collegeCode,
        password: req.body.password
    });

    // Save the organization information to the database
    newOrganization.save()
        .then(() => {
            // Redirect to the desired URL after saving
            res.redirect('http://localhost:4890');
        })
        .catch(err => res.status(400).send('Error saving data: ' + err));
});

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/org.html');
});

// Start the server
const port = 4001;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

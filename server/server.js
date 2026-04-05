const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Allow frontend to talk to backend
app.use(express.json()); // Parse incoming JSON data

// Basic route to check if server is running
app.get('/', (req, res) => {
    res.send('Alex Gym Backend API is running!');
});

// POST route to handle contact form submissions
app.post('/api/contact', (req, res) => {
    const { name, email, subject, message } = req.body;

    // Validate the incoming data
    if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    // For now, we will logically log this to the server console
    console.log('\n--- NEW GYM LEAD RECEIVED ---');
    console.log(`Name:    ${name}`);
    console.log(`Email:   ${email}`);
    console.log(`Subject: ${subject}`);
    console.log(`Message: ${message}`);
    console.log('-----------------------------\n');

    // Create a lead object with a timestamp
    const newLead = {
        id: Date.now(),
        date: new Date().toLocaleString(),
        name,
        email,
        subject,
        message
    };

    const leadsFilePath = path.join(__dirname, 'leads.json');

    // Check if the file already exists to read its contents
    fs.readFile(leadsFilePath, 'utf8', (err, data) => {
        let existingLeads = [];
        
        // If file exists and has content, parse it
        if (!err && data) {
            try {
                existingLeads = JSON.parse(data);
            } catch (err) {}
        }
        
        // Add the new lead to the array
        existingLeads.push(newLead);
        
        // Save the updated array back to the file
        fs.writeFile(leadsFilePath, JSON.stringify(existingLeads, null, 2), (err) => {
            if (err) {
                console.error('Failed to save to leads.json:', err);
                return res.status(500).json({ error: 'Server error saving the lead.' });
            }
            
            // Respond back to the frontend successfully
            res.status(200).json({ message: 'Contact form submitted successfully!' });
        });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`🏋️  Gym Server running on http://localhost:${PORT}`);
});
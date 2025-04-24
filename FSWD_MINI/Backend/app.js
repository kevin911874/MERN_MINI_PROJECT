// /app.js
const express = require('express');
const borrowRoutes = require('./routes/borrowRoutes');  // Import the borrow routes

const app = express();

app.use(express.json());  // Parse incoming JSON requests

// Register the borrow routes under the /api/borrow path
app.use('/api/borrow', borrowRoutes);

module.exports = app;

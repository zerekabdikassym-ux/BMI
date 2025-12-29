// server.js
require('dotenv').config();
const express = require('express');
const path = require('path');

const weatherRoutes = require('./routes/weather');
const newsRoutes = require('./routes/news');
const currencyRoutes = require('./routes/currency');

const app = express();
const PORT = 3000;

// middleware
app.use(express.json());
app.use(express.static('public'));

// routes
app.use('/api/weather', weatherRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/currency', currencyRoutes);

// main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// error handling
app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

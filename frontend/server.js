const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const BASE_URL = "http://20.244.56.144/evaluation-service";


app.get('/users', async (req, res) => {
    try {
        const { data } = await axios.get(${BASE_URL}/users);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// API to get posts based on query (popular/latest)
app.get('/posts', async (req, res) => {
    try {
        const type = req.query.type || 'latest';
        const { data } = await axios.get(${BASE_URL}/posts?type=${type});
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server running on http://localhost:${PORT}');
});
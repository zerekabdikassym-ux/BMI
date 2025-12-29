const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/', async (req, res) => {
    const city = req.query.city;

    if (!city) {
        return res.status(400).json({ error: 'City is required' });
    }

    try {
        const url = `https://newsapi.org/v2/everything?q=${city}&apiKey=${process.env.NEWS_API_KEY}`;

        const response = await axios.get(url);

        const articles = response.data.articles.slice(0, 5).map(article => ({
            title: article.title,
            url: article.url
        }));

        res.status(200).json(articles);

    } catch (error) {
        res.status(500).json({ error: 'News not found' });
    }
});

module.exports = router;

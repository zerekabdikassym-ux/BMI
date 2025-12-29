const express = require('express');
const axios = require('axios');

const router = express.Router();

// страна → валюта
const countryToCurrency = {
    KZ: 'KZT',
    US: 'USD',
    RU: 'RUB',
    GB: 'GBP',
    EU: 'EUR'
};

router.get('/', async (req, res) => {
    const countryCode = req.query.country?.toUpperCase();

    if (!countryCode) {
        return res.status(400).json({ error: 'Country code is required' });
    }

    const currency = countryToCurrency[countryCode];

    if (!currency) {
        return res.status(400).json({ error: 'Currency not supported' });
    }

    try {
        // ✅ БЕСПЛАТНЫЙ API БЕЗ КЛЮЧА
        const url = `https://open.er-api.com/v6/latest/${currency}`;
        const response = await axios.get(url);

        if (response.data.result !== 'success') {
            throw new Error('Currency API failed');
        }

        const rates = response.data.rates;

        res.status(200).json({
            base: currency,
            rates: {
                USD: rates.USD,
                EUR: rates.EUR,
                KZT: rates.KZT
            }
        });

    } catch (error) {
        console.error('Currency API error:', error.message);
        res.status(500).json({ error: 'Currency data not available' });
    }
});

module.exports = router;

// index.js
const express = require('express');
const axios = require('axios');
const { connectDB, db } = require('./db'); // Import connectDB and db from db.js

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Function to fetch cryptocurrency data from CoinGecko
const fetchCryptoData = async () => {
    const coins = ['bitcoin', 'matic-network', 'ethereum'];
    const promises = coins.map(coin =>
        axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`)
    );

    try {
        const responses = await Promise.all(promises);
        responses.forEach(async (response, index) => {
            const coinData = response.data[coins[index]];
            const cryptoInfo = {
                name: coins[index],
                price: coinData.usd,
                marketCap: coinData.usd_market_cap,
                change: coinData.usd_24h_change,
                timestamp: new Date() // Store the current date and time
            };
            await db.collection('cryptocurrencies').insertOne(cryptoInfo);
            console.log(`Document added for ${coins[index]}:`, cryptoInfo); // Log the added document
        });
    } catch (error) {
        console.error('Error fetching cryptocurrency data:', error);
    }
};

// API endpoint to get cryptocurrency stats
app.get('/stats', async (req, res) => {
    const { coin } = req.query;

    if (!coin) {
        return res.status(400).json({ error: "Please provide a coin parameter." });
    }

    const validCoins = ['bitcoin', 'matic-network', 'ethereum'];
    if (!validCoins.includes(coin)) {
        return res.status(400).json({ error: "Invalid coin. Valid options are: bitcoin, matic-network, ethereum." });
    }

    try {
        // Fetch the latest data from the database
        const latestData = await db.collection('cryptocurrencies')
            .find({ name: coin })
            .sort({ timestamp: -1 }) // Sort by timestamp to get the latest entry
            .limit(1)
            .toArray();

        if (latestData.length > 0) {
            const { price, marketCap, change } = latestData[0];
            console.log(`Latest data for ${coin}:`, { price, marketCap, change }); // Log the latest data
            return res.json({ price, marketCap, "24hChange": change });
        } else {
            return res.status(404).json({ error: "No data found for the requested coin." });
        }
    } catch (error) {
        console.error('Error fetching data from MongoDB:', error);
        res.status(500).json({ error: "Internal server error." });
    }
});

// API endpoint to calculate standard deviation
app.get('/deviation', async (req, res) => {
    const { coin } = req.query;

    if (!coin) {
        return res.status(400).json({ error: "Please provide a coin parameter." });
    }

    const validCoins = ['bitcoin', 'matic-network', 'ethereum'];
    if (!validCoins.includes(coin)) {
        return res.status(400).json({ error: "Invalid coin. Valid options are: bitcoin, matic-network, ethereum." });
    }

    try {
        // Fetch the last 100 records for the requested coin
        const records = await db.collection('cryptocurrencies')
            .find({ name: coin })
            .sort({ timestamp: -1 }) // Sort by timestamp to get the latest entries
            .limit(100) // Limit to the last 100 records
            .toArray();

        if (records.length === 0) {
            return res.status(404).json({ error: "No data found for the requested coin." });
        }

        // Calculate the standard deviation of the prices
        const prices = records.map(record => record.price);
        const mean = prices.reduce((acc, price) => acc + price, 0) / prices.length;
        const variance = prices.reduce((acc, price) => acc + Math.pow(price - mean, 2), 0) / prices.length;
        const deviation = Math.sqrt(variance);

        console.log(`Standard deviation for ${coin}:`, deviation); // Log the standard deviation
        return res.json({ deviation: parseFloat(deviation.toFixed(2)) }); // Round to 2 decimal places
    } catch (error) {
        console.error('Error fetching data from MongoDB:', error);
        res.status(500).json({ error: "Internal server error." });
    }
});

// Schedule the background job to run every 2 hours
setInterval(fetchCryptoData, 2 * 60 * 60 * 1000); // 2 hours in milliseconds

// Start the server

app.listen(PORT, () => {
    console.log(`Server is running on PORT${PORT}`);
    // Fetch data immediately on startup
    fetchCryptoData();
});

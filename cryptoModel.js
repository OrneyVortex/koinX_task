const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
    name: { type: String, required: true },
    symbol: { type: String, required: true },
    price_usd: { type: Number, required: true },
    market_cap_usd: { type: Number, required: true },
    percent_change_24h: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now }
});

const Crypto = mongoose.model('Crypto', cryptoSchema);

module.exports = Crypto;

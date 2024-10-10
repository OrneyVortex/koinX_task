const axios = require('axios');
const Crypto = require('./cryptoModel');

const fetchCryptoData = async () => {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,matic-network,ethereum&vs_currencies=usd&include_market_cap=true&include_24hr_change=true');

        const cryptoData = [
            {
                name: 'Bitcoin',
                symbol: 'BTC',
                price_usd: response.data.bitcoin.usd,
                market_cap_usd: response.data.bitcoin.usd_market_cap,
                percent_change_24h: response.data.bitcoin.usd_24h_change,
            },
            {
                name: 'Matic',
                symbol: 'MATIC',
                price_usd: response.data['matic-network'].usd,
                market_cap_usd: response.data['matic-network'].usd_market_cap,
                percent_change_24h: response.data['matic-network'].usd_24h_change,
            },
            {
                name: 'Ethereum',
                symbol: 'ETH',
                price_usd: response.data.ethereum.usd,
                market_cap_usd: response.data.ethereum.usd_market_cap,
                percent_change_24h: response.data.ethereum.usd_24h_change,
            }
        ];

        // Save data to the database
        await Crypto.insertMany(cryptoData);
        console.log('Crypto data saved:', cryptoData);
    } catch (error) {
        console.error('Error fetching crypto data:', error);
    }
};

module.exports = fetchCryptoData;

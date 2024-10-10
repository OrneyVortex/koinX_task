# Cryptocurrency Price Tracker

A Node.js application that fetches real-time cryptocurrency data for Bitcoin, Matic, and Ethereum from the CoinGecko API. This application stores the data in a MongoDB database and provides RESTful APIs to retrieve the latest statistics and calculate the standard deviation of prices.

## Features

- Fetches real-time cryptocurrency data every 2 hours.
- Provides an API endpoint `/stats` to retrieve the latest price, market cap, and 24h price change of a specified cryptocurrency.
- Provides an API endpoint `/deviation` to calculate the standard deviation of the last 100 price records for a specified cryptocurrency.

## Technologies Used

- **Node.js**: JavaScript runtime for server-side programming.
- **Express.js**: Web framework for building APIs.
- **Axios**: Promise-based HTTP client for making requests to the CoinGecko API.
- **MongoDB**: NoSQL database for storing cryptocurrency data.
- **Mongoose**: ODM library for MongoDB and Node.js (if used).

## Installation

1. **Clone the repository**:
2. use **npm install**

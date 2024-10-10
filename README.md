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

## Usage
- After Installation go to the source folder and type ```node index.js``` to start the backend!
As the part of task1 the information about the coins will be shown in the console and also the data will be stored in out DB too.
- ![image](https://github.com/user-attachments/assets/3227c72d-fd3a-4835-88d2-f5471c3259f4)
MongoDB:
![image](https://github.com/user-attachments/assets/d86a5da1-82dc-445c-9a24-09d2bf1f5afd)

## API Endpoints
### 1. Get Cryptocurrency Stats
Endpoint: /stats?coin=bitcoin
Method: GET
Query Parameters:
coin: The cryptocurrency to retrieve data for. (Options: bitcoin, matic-network, ethereum)
Functionality: When you call this endpoint, it queries the MongoDB database for the latest record of the specified cryptocurrency. It then returns the current price, market cap, and 24-hour price change.

Example: [http://127.0.0.1:3000/deviation](http://127.0.0.1:3000/stats?coin=bitcoin)
Example response: ![image](https://github.com/user-attachments/assets/e62cc3f1-8c8b-4b68-9f6f-71e3ef17f3d2)

### 2. Get Standard Deviation of Prices
Endpoint: /deviation?coin=bitcoin
Method: GET
Query Parameters:
coin: The cryptocurrency to calculate the standard deviation for. (Options: bitcoin, matic-network, ethereum)
Functionality: This endpoint calculates the standard deviation of the price of the specified cryptocurrency from the last 100 records stored in the database. It computes the deviation to provide insights into the price volatility of the cryptocurrency.
Example : http://127.0.0.1:3000/deviation?coin=bitcoin 
Example respone: ![image](https://github.com/user-attachments/assets/70c108ba-2037-4af5-bc22-24b33b674958)







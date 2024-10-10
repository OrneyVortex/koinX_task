// db.js
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://admin:password12345@cluster0.njbiapq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // Replace <db_password> with your actual password
const client = new MongoClient(uri);

async function connectDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
}

const db = client.db('cryptoDB'); // Use your database name here
module.exports = { connectDB, db };

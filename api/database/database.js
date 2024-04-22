const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

// MongoDB connection URI
const uri = process.env.MONGO;

// Create a new MongoDB client
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

// Connect to MongoDB
async function connectToMongoDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

module.exports = { client, connectToMongoDB };

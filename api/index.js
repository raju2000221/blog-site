const express = require('express');
const cors = require('cors');
const { connectToMongoDB } = require('./database/database');
const userRoutes = require('./routes/userRoute');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectToMongoDB();

// Mount user routes
app.use('/', userRoutes);

// Default route
app.get('/', (req, res) => {
    res.send("Server Running");
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on ${port}`);
});

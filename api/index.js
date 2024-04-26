const express = require('express');
const cors = require('cors');
const { connectToMongoDB } = require('./database/database');
const userRoutes = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');
const updateUserRoute = require('./routes/updateUserRoute');
const deleteUserRoute = require('./routes/deleteAccRoute');
// const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
// app.use(cookieParser())


connectToMongoDB();

// Mount user routes
app.use('/', userRoutes);
app.use('/', authRoute);
app.use('/', updateUserRoute,deleteUserRoute );

// Default route
app.get('/', (req, res) => {
    res.send("Server Running");
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on ${port}`);
});

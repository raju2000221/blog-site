const express = require('express');
const cors = require('cors');
const { connectToMongoDB } = require('./database/database');
const userRoutes = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');
const updateUserRoute = require('./routes/updateUserRoute');
const deleteUserRoute = require('./routes/deleteAccRoute');
const createPost = require('./routes/Post.route');
const gtepost = require('./routes/postRoute');
const postdelete = require('./routes/post.delete.route');
const getpostUpdate = require('./routes/getupdatepost');
const updatepost = require('./routes/updatepost');

const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 5000;
const corsOptions = {
  origin: (origin, callback) => {
    // Check if the origin is allowed
    if (!origin || origin.startsWith('http://localhost')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
connectToMongoDB();
// Apply verifyToken middleware to relevant routes
app.use('/', userRoutes);
app.use('/', authRoute);
app.use('/', updateUserRoute); 
app.use('/',  deleteUserRoute); 
app.use('/',  createPost); 
app.use('/',  gtepost); 
app.use('/',  postdelete); 
app.use('/',  getpostUpdate); 
app.use('/',  updatepost); 



// Default route
app.get('/', (req, res) => {
    res.send("Server Running");
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on ${port}`);
});

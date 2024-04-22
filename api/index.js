import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserRoutes from './routes/User.route.js';
import AuthRoute from './routes/auth.route.js';

dotenv.config()
mongoose.connect(process.env.MONGO).then( () =>{
    console.log('mongodb connected')
})

const app = express();

app.use(express.json());

app.listen(3000, () =>{
    console.log('port running 3000')
})


app.use('/api/user', UserRoutes )
app.use('/api/auth', AuthRoute )

app.use((err, req, res, next) =>{
    const statusCode = err.statusCode || 500
    const message = err.message || 'internal server error';
    res.status(statusCode).json({
        success : false,
        statusCode,
        message
    })
})
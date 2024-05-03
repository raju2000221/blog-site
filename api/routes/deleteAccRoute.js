const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { client } = require('../database/database');
const { ObjectId } = require('mongodb');

router.get('/userDelete', async (req, res) => {
    const token = req.cookies.token;
    const User = client.db('blog').collection('blogUser');
    try {
        if (!token) {
            return res.status(401).json({ message: 'Token not provided' });
        }

        jwt.verify(token, process.env.JWT_SEC, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Unauthorized' });
            } else {
                const userId = new ObjectId(decoded.id); // Convert userId to ObjectId
                console.log('objectid', userId)
                const user = await User.findOneAndDelete({ _id: userId });
                console.log('Deleted user:', user);
            }
        });

       return res.status(200).json({ message: 'User deleted successfully' });

    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;

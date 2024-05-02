const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { client } = require('../database/database');
const { ObjectId } = require('mongodb');

router.put('/userUpdate', async (req, res) => {
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
                const userId = new ObjectId(decoded.id);
                const user = await User.findOne({ _id: userId });
                if (!user) {
                    return res.status(404).json({ error: 'User not found' });
                }
                const { userUpdateValue } = req.body;
                const { name, photoUrl } = userUpdateValue;

                if (name) {
                    user.name = name;
                }
                if (photoUrl) {
                    user.photoUrl = photoUrl;
                }

                await User.updateOne({ _id: userId }, { $set: user });

                res.status(200).json({
                    name: user.name,
                    email: user.email,
                    _id: user._id,
                    photoUrl: user.photoUrl
                });
            }
        });

    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;

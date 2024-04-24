const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { client } = require('../database/database');
const jwt = require("jsonwebtoken");
const { ObjectId } = require('mongodb');

router.put('/userUpdate/:userID', async (req, res) => {
    const User = client.db('blog').collection('blogUser');
    try {
        const { userID } = req.params;
        const { name, photoUrl } = req.body;
        const userIdObject = new ObjectId(userID);
        const user = await User.findOne({ _id: userIdObject });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update user fields if new values are provided
        if (name) {
            user.name = name;
        }
        if (photoUrl) {
            user.photoUrl = photoUrl;
        }

        await User.updateOne({ _id: userIdObject }, { $set: user });
        res.status(200).json({
             name : user.name, 
             email :user.email, 
             _id : user._id, 
             photoUrl : photoUrl });
        console.log(user)

    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;

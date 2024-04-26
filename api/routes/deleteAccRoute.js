const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { client } = require('../database/database');
const { ObjectId } = require('mongodb');

router.post('/userDelete/:userID', async (req, res) => {
    const User = client.db('blog').collection('blogUser');
    try {
        const { userID } = req.params;
        console.log(userID)
        const userIdObject = new ObjectId(userID);
        const user = await User.findOneAndDelete({ _id: userIdObject });
        console.log(user)
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        res.status(200).json({ message: 'User deleted successfully' });

    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;


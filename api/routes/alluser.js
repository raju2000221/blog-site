const express = require('express');
const router = express.Router();
const { client } = require('../database/database');

router.get('/getalluser', async (req, res) => {
    try {
        const userCollection = client.db('blog').collection('blogUser');
        const users = await userCollection.find({}).toArray();
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Error fetching users" });
    }
});

module.exports = router;

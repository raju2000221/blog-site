const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { client } = require('../database/database');
const jwt = require("jsonwebtoken")


router.post('/post', async (req, res) => {
if(!req.body.isAdmin){
    return res.status(400).json({
        message: "You are not allowd to create post"
    })
}
});






module.exports = router;

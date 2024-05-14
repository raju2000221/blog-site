
const express = require('express');
const router = express.Router();
const { client } = require('../database/database');
const jwt = require("jsonwebtoken");
const { ObjectId } = require('mongodb');

router.get('/updatepost/:postId/:userId', async (req, res) => {
    const { postId, userId } = req.params;
    console.log(postId,userId)

    try {
        const token = req.cookies.token;
        console.log('token', token)
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        jwt.verify(token, process.env.JWT_SEC, async (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    message: "Unauthorized"
                });
            }

            const userIdObj = new ObjectId(userId);
            const user = await client.db('blog').collection('blogUser').findOne({ _id: userIdObj });
            console.log('user', user)

            if (!user || !user.isAdmin) {
                return res.status(403).json({
                    message: "Forbidden: You are not authorized to update this post."
                });
            }

            // Fetch post data using postId
            const post = await client.db('blog').collection('post').findOne({ _id: new ObjectId(postId) });

            if (!post) {
                return res.status(404).json({
                    message: "Post not found"
                });
            }

            // Send the post data back in the response
            res.status(200).json({
                message: "Post fetched successfully",
                post: post
            });

        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
module.exports = router;
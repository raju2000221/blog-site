const express = require('express');
const router = express.Router();
const { client } = require('../database/database');
const { ObjectId } = require('mongodb');

router.delete('/deletepost/:postId/:userId', async (req, res) => {
    const userId = req.params.userId;
    console.log(userId)
    try {
        const postId = new ObjectId(req.params.postId);
        const verifyadmin = await client.db('blog').collection('post').findOne({ userId: userId, _id:postId});

        if(verifyadmin ){
            const result = await client.db('blog').collection('post').deleteOne({ _id: postId });
            if (result.deletedCount === 1) {
                res.status(200).json({ message: 'Post deleted successfully' });
            } else {
                res.status(404).json({ error: 'Post not found' });
            }

        }
       
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;

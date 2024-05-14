const express = require('express');
const router = express.Router();
const { client } = require('../database/database');

router.get('/getpost', async (req, res) => {
    console.log(req.query.userId);
    const post = client.db('blog').collection('post');

    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 1;
        const sortDirection = req.query.order === 'asc' ? 1 : -1;
        const query = {
            ...(req.query.userId && { userId: req.query.userId }),
            ...(req.query.postId && { postId: req.query.postId }),
            ...(req.query.category && { category: req.query.category }),
            ...(req.query.slug && { slug: req.query.slug }),
            ...(req.query.searchTerm && {
                $or: [
                    { title: { $regex: req.query.searchTerm, $options: 'i' } },
                    { content: { $regex: req.query.searchTerm, $options: 'i' } }
                ]
            })
        };

        const posts = await post.find(query)
            .sort({ updatedAt: sortDirection })
            .skip(startIndex)
            .limit(limit)
            .toArray();

        const totalPost = await post.countDocuments(query);

        const date = new Date();
        const oneMonthAgo = new Date(
            date.getFullYear(),
            date.getMonth() - 1,
            date.getDate()
        );
        const lastMonthPosts = await post.countDocuments({
            createdAt: { $gte: oneMonthAgo }
        });

        res.status(200).json({
            posts,
            totalPost,
            lastMonthPosts
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;

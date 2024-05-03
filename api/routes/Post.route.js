const express = require('express');
const router = express.Router();
const { client } = require('../database/database');
const jwt = require("jsonwebtoken");
const { ObjectId } = require('mongodb');


router.post('/createpost', async (req, res) => {
    const token = req.cookies.token;
    const {fromData} = req.body;
    const User = client.db('blog').collection('blogUser');
    const post = client.db('blog').collection('post');
    console.log('token',token)
    console.log('post data',fromData)
try{
    if(!token){
        return res.status(401).json({
            message: "Unthorize"
        })
    }
    jwt.verify(token, process.env.JWT_SEC, async (err, decoded) =>{
        if(err){
            return res.status(401).json({
                message: "Unthorize"
            })
        }else{
            const userId = new ObjectId(decoded.id)
            const user = await User.findOne({ _id: userId });
            if(user && user.isAdmin){
                const slug = fromData.title
                .split(' ')
                .join('-')
                .toLowerCase()
                .replace(/[^a-zA-Z0-9]/g, '-');

                const result = await post.insertOne({
                    ...fromData,
                    slug,
                    userId: decoded.id
                });
                res.status(201).json({
                    message: 'User signed up successfully',
                });
            }else{
               
            }

    
        }
    
    
    })
}catch(error){

}
});






module.exports = router;

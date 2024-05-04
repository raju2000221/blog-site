const express = require('express');
const router = express.Router();
const { client } = require('../database/database');
const jwt = require("jsonwebtoken");
const { ObjectId } = require('mongodb');


router.post('/createpost', async (req, res) => {
    const token = req.cookies.token;
    const {postData} = req.body;
    const User = client.db('blog').collection('blogUser');
    const post = client.db('blog').collection('post');
    console.log('token',token)
    console.log('post data',postData)
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
            
                const result = await post.insertOne({
                    ...postData,
                    userId: decoded.id
                });
                res.status(201).json({
                    message: '',
                });
            }else{
               
            }

    
        }
    
    
    })
}catch(error){

}
});






module.exports = router;

const express = require('express');
const router = express.Router();
const { client } = require('../database/database');
const jwt = require("jsonwebtoken");
const { ObjectId } = require('mongodb');


router.post('/createpost', async (req, res) => {
    const token = req.cookies.token;
    const User = client.db('blog').collection('blogUser');

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
                
            }else{
               
            }

    
        }
    
    
    })
}catch(error){

}
});






module.exports = router;

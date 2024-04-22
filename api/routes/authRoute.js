const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { client } = require('../database/database');
const jwt = require("jsonwebtoken")


router.post('/userLogin', async (req, res) => {
    try {
        const User = client.db('blog').collection('blogUser');

        const { usernameEmail, password } = req.body;
        if(usernameEmail){
            const existingEmail = await User.findOne({email : usernameEmail});
            const existingUser = await User.findOne({username : usernameEmail});

            if(existingUser || existingEmail ){
                const user = existingEmail || existingUser;

               const comparePassword = bcrypt.compareSync(password, user.password);
               if(comparePassword){
                const { username, email, _id } = user;
                const token = jwt.sign(
                    {
                        userID:user._id
                    },
                    process.env.JWT_SEC
                )
                res.status(200).cookie('access_token', token, {               
                    httpOnly:true,
                    success: true
                }).json({ username, email,_id })
               }else{
                return res.status(401).json({
                    message: "Invalid Password"
                })
               }
             
            }
            else
            {return res.status(403).json({
                    message: "User or Email Not Found"
                })
            }

        }
        else{
            return res.status(400).json({
                message: "This field are Required"
            })
        }
      
    } catch (error) {
        console.error('Error signing up user:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

module.exports = router;

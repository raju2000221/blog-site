const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { client } = require('../database/database');

router.post('/userSignUp', async (req, res) => {
    try {
        const User = client.db('blog').collection('blogUser');

        const { username, email, password } = req.body;
        if(username && email && password){
            const existingUser = await User.findOne({email : email});
            if(!existingUser){
                if(password.length >= 6){
                    const hashedPassword = await bcrypt.hash(password, 10);
                    const newUser = {
                        username,
                        email,
                        password: hashedPassword
                    };
                    const result = await User.insertOne(newUser);
                    res.status(201).json({
                        message: 'User signed up successfully',
                    });
                }else{
                    return res.status(401).json({
                        message: "password at lest 6 character"
                    })
                }
            }
            else
            {return res.status(402).json({
                    message: "This email allready Registared"
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
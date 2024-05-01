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
            const existingUser = await User.findOne({name : usernameEmail});

            if(existingUser || existingEmail ){
             
                const user = existingEmail || existingUser;
                if(!(user.password)){
                    return res.status(401).json({
                        message: "Invalid Password"
                    })
                }
               const comparePassword = bcrypt.compareSync(password, user.password);
               if(comparePassword){
                const {name, email, _id, photoUrl, isAdmin } = user;
                const token = jwt.sign(
                    {
                        userID:user._id
                    },
                    process.env.JWT_SEC
                )
                res.status(200).cookie('access_token', token, {  
                         
                    httpOnly:true,
                }).json({ name, email, _id, photoUrl ,isAdmin })
                console.log(token)   
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

router.post('/googleLogin', async (req, res) => {
    try {
        const User = client.db('blog').collection('blogUser');

        const { email, name, photoUrl } = req.body;
        const existingEmail = await User.findOne({ email: email });
        let token;

        if (existingEmail) {
            const { email, name, photoUrl, _id, isAdmin } = existingEmail;
            const newUser = {
                email,
                name,
                isAdmin,
                photoUrl,
                _id
            };
            token = jwt.sign({ id: existingEmail._id }, process.env.JWT_SEC);
            res.cookie('access_token', token, { httpOnly: false }).json(newUser);
        } else {
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth() + 1;
            const day = currentDate.getDate();
            const hours = currentDate.getHours();
            const minutes = currentDate.getMinutes();
            const seconds = currentDate.getSeconds();
            const localDateString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

            const newUser = {
                email,
                name,
                isAdmin: false,
                photoUrl,
                createdAt: localDateString
            };
            const result = await User.insertOne(newUser);
            token = jwt.sign({ id: newUser._id }, process.env.JWT_SEC);
            res.cookie('access_token', token, { httpOnly: false }).json(newUser);
        }

    } catch (error) {
        console.error('Error signing up user:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});
router.post('/set-cookie', (req, res) => {

        res.cookie('myCookie', 'cookie_value', { maxAge: 3600000 });
        res.send('Cookie set successfully');
        console.log('cookie')
      });



module.exports = router;


import express from 'express'
import User from '../models/user.model.js'
import bcrypts from 'bcryptjs'
const router = express.Router();
router.post('/signup', async (req, res, next) =>{
const {userName, email, password} = req.body;
if(!userName || !email || !password || userName === ''|| email === '' || password === ''){
    return res.status(json({message:'all field are required'}))
}
const hashedPassword = bcrypts.hashSync(password, 10)
const newUser = new User({
    userName,
    email,
    password : hashedPassword
})
try{
    await newUser.save();
    res.send(json('send successfully'))
}
catch(error){
next(error)
}
})

export default router
const express = require('express')
const Route = express.Router()
const CryptoJS = require('crypto-js')
const User = require('../Commercemodels/Clientschema')
require('dotenv').config();
Route.get('/', (req, res)=> {
    res.send('The server is now  getting your response')
})
//Register the user
Route.post('/register', async (req, res)=> {
   const newuser = new User({
    username: req.body.username,
    password:CryptoJS.AES.encrypt(req.body.password, process.env.PASSWORD_SEC).toString(),
    email: req.body.email
   })
   try {
    const user = await newuser.save()
    res.status(200).json(user)
   }catch(err){
    res.status(200).json(err)
   }

})

// Login 

Route.post('/login', async (req, res)=> {
    try {
      // get me the data of user who is trying to login through his email
    const user = await User.findOne({ username : req.body.username})
    const hashedpassword = CryptoJS.AES.decrypt(user.password, process.env.PASSWORD_SEC)
    // turn the hashedpassword in the users database  into a string for easy comparism
    const password = hashedpassword.toString(CryptoJS.enc.utf8);
    if (password !== user.password) {
       res.status(401).json('You are not authorized to access this resource')
    } else {
      res.status(200).json('You can now access your information')
    }

   } catch(err){
   res.status(500).json(err)
   }
   // if no user exist
    // check if the password is correct
    

    
})

module.exports = Route



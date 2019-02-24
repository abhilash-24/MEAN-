const User =  require('../models/User')
const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const db = `mongodb+srv://abhilash:${encodeURIComponent('gQCizSFFlj9bBMhm')}@cluster0-ymkk1.mongodb.net/test?retryWrites=true`;
mongoose.connect(db, err=>{
    if(err){
        console.log('Error '+err)
    }
    else {
        console.log('Connected to mongoDb')
    }
})
router.get('/', (req, res) =>{
    res.send('From API route')
})
router.post('/register', (req, res) =>{
    let userData  = req.body;
    let _user = new User(userData);
    _user.save((error, registeredUser) => {
        if(error) {
            console.log(error)
        }
        else{
            res.status(200).send(registeredUser)
        }
    });
})
router.post('/login', (req, res)=> {
    let userData = req.body
    User.findOne({email: userData.email}, (error, user)=> {
        if(error){
            console.log(error)
        }
        else if(!user)  {
            res.status(401).send('Invalid email')
        }
        else if(user.password !== userData.password) {
            res.status(401).send('Invalid password')
        }
        else {
            res.status(200).send(user)
        }

    })
})
module.exports = router;
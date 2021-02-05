const express = require('express')

const router = express.Router()

const User = require('../models/User')

const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken') 

const config = require('config')

//Login
router.post("/", (req, res)=>{
    const {username,password} = req.body

    User.findOne({username}, (err, user)=>{
        console.log(err)
        if(err || user == null) return res.status(401).json({message: "User not found!"})

        bcrypt.compare(user.password, password, (err, success)=>{
            if(err) res.status(402).send({message: `Wrong password for user ${username}!`})

            jwt.sign({id: user.id}, config.get('jwtSecret'), {expiresIn: 3600}, (err, encoded)=>{
                if(err) res.status(401).send({message: "Error authenticating!"})
                res.json({
                    token: encoded,
                    user:{
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        is_admin: user.is_admin
                    }
                })
            })
        })
    })
})

module.exports = router
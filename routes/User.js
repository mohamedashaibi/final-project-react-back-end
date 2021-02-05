const express = require('express')
const User = require('../models/User')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const auth = require('../middleware/auth')


router.get('/',auth, (req, res)=>{
    User.find().then(users=>res.status(200).json(users)).catch((err)=>{res.status(400).json({message: "Couldn't get users!"})})
})

router.post('/', (req,res)=>{
    const {name, username, password} = req.body

    //Simple validation
    if(!name || !username||!password){
        return res.status(400).json({message: "All fields must filled."})
    }

    //check if use exists using username
    User.findOne({username: username}).then((userFound)=>{
        //Search for user if exists
        // if(User.findOne(userFound)) return res.send({message: "User already exists."})

        //If user doesn't exist create user
        const user = new User({
            name,
            username,
            password
        })

        bcrypt.genSalt(10, (err, salt)=>{
            if(err || !user) return res.status(400).json({message: "Error, invalid request!"})
            bcrypt.hash(user.password, salt, (err, hash)=>{
                if(err) throw err
                user.password = hash
                user.save().then(userCreated=>{

                    jwt.sign({id: userCreated.id}, config.get('jwtSecret'), {expiresIn: 3600}, (err, encoded)=>{
                        if(err) throw(err)

                        res.json({
                            token: encoded,
                            user:{
                            id: userCreated.id,
                            username: userCreated.username,
                            is_admin: userCreated.id_admin
                        }})
                    })

                    
                }).catch(err=>{console.log(err)})
            }) 
        })

    })

})


module.exports = router
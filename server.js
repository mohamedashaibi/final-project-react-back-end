const express = require('express')

require('dotenv').config()

const connect = require('./config/Connect')

const cors = require('cors')

const app = express()

app.use(cors())

app.use(express.json())

connect()

const productRouter = require('./routes/Product')

const userRouter = require('./routes/User')

const authRouter = require('./routes/Auth')

const uri = '/shop'

// Add routes middleware
app.use(uri + '/product', productRouter)

app.use(uri + '/user', userRouter)

app.use(uri + '/auth', authRouter)

app.listen(process.env.PORT, (err)=>{
    if(err){
        console.log('Error connecting to server!')
    }
    console.log(`Connected to server successfully on port ${process.env.PORT}`)
})


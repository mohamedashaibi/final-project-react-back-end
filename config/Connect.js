const mongoose = require('mongoose')
const config = require('config')


const Connect = async() => {
    try{
        await mongoose.connect(config.get('mongoURI'),{ useUnifiedTopology: true, useNewUrlParser: true }, (err)=>{
            if(err) return console.log("Couldn't connect to DB " + err)
            console.log("Connected to db successfully!")
        })
    }catch(e){
        return console.log("Exception "+e)
    }
}

module.exports = Connect
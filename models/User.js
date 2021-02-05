var mongoose = require('mongoose')

const User = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    image: {
        type: String,
        default: ""
    },
    favourites: {
        type: [String]
    },
    likes: {
        type: [String]
    },
    is_admin: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("User", User)
const config = require('config')
const jwt = require('jsonwebtoken')

function auth(req, res, next){
    console.log("Param in auth server = " + req.params.product)
    const token = req.header('x-auth-token')

    if(!token){
        return res.status(401).json({message: "Unauthorized"})
    }

    try{
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        console.log(decoded)
        req.user = decoded
        return next()
    }catch(e){
        return res.json({message: "Token is not valid!"})
    }
}

module.exports = auth
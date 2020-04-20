const jwt = require('jsonwebtoken')

//middleware
const authed = (req,res,next) => {
    const tkn = req.header('auth-token')
    if(!token) return res.status(403).send("Acces denined")
    try {
        const verif = jwt.verify(token,process.env.PAYLOAD)
        req.User = verif 
    } catch (err) { 
        res.status(400).send("Invalid Token")
    }
}

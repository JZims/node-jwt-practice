import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()


//Middleware that verifies user is the correct user, then sends to GET /post
export const authenticateToken = async (req, res, next) => {
    try{
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        if(token == null) return res.sendStatus(401)

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.sendStatus(403)

            req.user = user
            next()

        })
    } catch (err) {
        res.sendStatus(500).json({err})
        next()
    }
    
}

export const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15s'})
}


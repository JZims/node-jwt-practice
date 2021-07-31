import generateAccessToken from "../middlewares/auth"
import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()


//Tokens to be stored in DB
let refreshTokens = []

export const login = (req, res) => {
    //Authenticates User
    const username = req.body.username
    const user = { name: username }

    const accessToken = generateAccessToken(user)
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    refreshTokens.push(refreshToken)
    res.json({ accessToken: accessToken, refreshToken: refreshToken })
}

export const logout = (req, res) => {
    refreshTokens = refreshTokens.filter(token =>  token !== req.body.token)
    res.sendStatus(204)
}

export const refresh = (req, res) => {
    const refreshToken = req.body.token
    if (refreshToken == null) return res.sendStatus(401)
    if (refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res,sendStatus(403)
        const accessToken = generateAccessToken({ name: user.name })
        res.json({ accesstoken: accessToken })
    })
}
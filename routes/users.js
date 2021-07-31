import express from "express"
import { login, logout, refresh } from "../controllers/user_controller"


const router = express.Router()

router.post('./token', refresh )

router.delete('/logout', logout )

router.post('/login', login)


export default router
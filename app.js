import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import sheets from './routes/sheets'
import users from './routes/users'

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())


const PORT = process.env.PORT
    
mongoose.connect(process.env.DB_CONNECTION,{ useNewUrlParser: true, useUnifiedTopology: true })   
    .then(() => app.listen(PORT, () => console.log('connected to db!')))
    .catch((e) =>  console.log(e.message))

mongoose.set('useFindAndModify', false)

app.use('/sheets', sheets)
app.use('/users', users)
app.use("*", (req, res) => res.status(404).json({ error: "Not found" }))


export default app

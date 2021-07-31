require('dotenv').config()

const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')

app.use(express.json())


const sheets = [
    {
        username: "Josh", 
        title: 'Post 1'
    }, 
    {
        username: "Char", 
        title: 'Post 2'
    }
]

app.get('/sheets', authenticateToken, (req, res) => {
    
    res.json(sheets.filter(sheet => sheet.username === req.user.name))
})



app.listen(8000)
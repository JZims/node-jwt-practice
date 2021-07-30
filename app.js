const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

const homeRoute = require('./routes/home.js')
const postsRoute = require('./routes/posts.js')
app.use(cors())
// app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Middlewares
app.use('/posts', postsRoute);
app.use('/', homeRoute);


const PORT = process.env.PORT
mongoose.connect(
    process.env.DB_CONNECTION,{ useNewUrlParser: true, useUnifiedTopology: true
     })
     .then(() => app.listen(PORT, () => console.log('connected to db!')))
     .catch((e) =>  console.log(e.message))


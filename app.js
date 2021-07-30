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
// app.use(auth);


//Routes
// app.get('/', (req, res) => {
//     res.send('We are on home');
// });

//Connect to DB

mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('connected to db!')
);


//Listening to server
app.listen(8000);

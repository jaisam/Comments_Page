// Require modules/models using require keyword ofExpress
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


// Init App
const app = express();


// Connecting to Database
mongoose.connect(process.env.db_url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => console.log(`Connected to DB!`)
);
const db = mongoose.connection;
db.on('error', (error) => console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('connnected'));


// Listen to PORT
app.listen(process.env.port, () => console.log(`Connected to port ${process.env.port} `));


// Body Parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Importing Routes
const commentRoute = require('./Routes/Comment');


// Routes middleware
app.use('/comments', commentRoute);


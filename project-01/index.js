const express = require('express');

const users = require('./MOCK_DATA.json');
const fs   = require('fs');

const app = express();
const mongoose = require('mongoose');

const PORT = 3000;

// Connection to MongoDB
 const {connectMongoDB} = require('./connection');
connectMongoDB('mongodb://127.0.0.1:27017/userdb').then(()=>{
    console.log('Connected to MongoDB');
 });

// middlewares
const {LogReqRes} = require('./middlewares');
app.use(express.urlencoded({extended: false}));
app.use(LogReqRes('logs.txt'));

//Routes
const userRoutes = require('./routes/user');
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 
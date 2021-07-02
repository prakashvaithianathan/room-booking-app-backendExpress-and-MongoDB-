const express = require('express');
const app = express();
app.use(express.json());
const dotenv = require('dotenv');
dotenv.config({path:'./config/config.env'})

const apiRouter = require('./routes');
app.use('/',apiRouter);
const mongoDB = require('./config/database');
mongoDB();


app.get('/',(req, res) => {
    res.send('welcome to home route')
})

app.listen(5000,()=>{
    console.log('server has been started');
})
//------------------------------------- require -------------------------
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const fs = require('fs');
//-----------------------------------------------------------------------

//---------------------------- mongoose ---------------------------------
//mongodb connection
mongoose.connect(config.database);

//check if connected
mongoose.connection.on('connected',()=>{
    console.log("Connected to DB " + config.database);
});

//check if db error
mongoose.connection.on('error',(err)=>{
    console.log("DB error " + err);
});
//-----------------------------------------------------------------------


//start express 
const app = express();

//the router file for users
const users = require('./routes/users')

//port
const port = 3000;

//middlewares
//any domain can access our server 
app.use(cors());

//static folder
app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname,'/uploads')));
// app.use(express.static('uploads'));



//get form data incoming request
app.use(bodyParser.json({limit: '150mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '150mb', extended: true}))

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

//user routes file
app.use('/users', users); 

//index route
app.get('/',(req,res) => {
 res.send("Haye Mere Bachay.");
});


//create server
app.listen(port,()=>{
    console.log("Server started on port "+port);
})

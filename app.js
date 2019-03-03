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
const users = require('./routes/users');
const schools = require('./routes/schools');

//port
const port = process.env.PORT || 3000;

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
app.use('/schools', schools); 

//index route
app.get('/',(req,res) => {
 res.send("Haye Mere Bachay.");
});

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '/public', 'index.html'));
    // res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.get('/test/:id',(req,res)=>{
    var id = req.params.id;
    var rand = Math.random();

    setTimeout(function() {
        res.json({
            success:true,
            id:id,
            got:"got id : " + id,
            sleptfor:rand
        })    
    }, rand);
    
})


//create server
app.listen(port,()=>{
    console.log("Server started on port "+port);
})

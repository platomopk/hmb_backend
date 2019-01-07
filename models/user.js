const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
const Moment = require('moment');
const MomentRange = require('moment-range');
const moment = MomentRange.extendMoment(Moment);

//user schema
const UserSchema = mongoose.Schema({
    fullname:{
        type: String
    },
    gender:{
        type:String
    },
    cnic:{
        type:String
    },
    phone:{
        type:String
    },
    city:{
        type:String
    },
    landline:{
        type:String
    },
    account:{
        type:String
    },
    address:{
        type:String
    },
    picture:{
        type:String
    },
    picturename:{
        type:String
    },
    usertoken:{
        type:String
    },
    homelocation:{
        type:String
    },
    childs:[
        {
            fullname:{
                type:String
            },
            cnic:{type:String,unique:true},
            gender:String,
            picture:String,
            schoolcity:String,
            schoolname:String,
            grade:String,
            section:String,
            rollnumber:String,
            schoollocation:String,
            created:{
                type:Date,
                default:moment.utc().toDate()
            },
            isverified:Boolean
        }
    ],
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String
    },
    created:{
        type:Date,
        default:moment.utc().toDate()
    }
});

//to get this function from outside, export it
const User = module.exports = mongoose.model('User',UserSchema);


module.exports.getUserById = function(id, callback){
    User.findById(id,callback);
}

module.exports.getUserByEmail = function(email, callback){
    const query = {email: email};
    User.findOne(query,callback);
}

module.exports.addUser = function(newUser, callback){
    
    bcrypt.genSalt(10, (err,salt)=>{
        bcrypt.hash(newUser.password,salt,(err,hash)=>{
            if(err){
                throw err;
                //res.json({success:false,msg:err});
            }else{
                //res.json({success:false,msg:err});
                newUser.password = hash;
                newUser.save(callback);
            }
            
        });
    });
    
}

module.exports.comparePassword = function(password,hash,callback){
    bcrypt.compare(password,hash,(err,isMatch)=>{
        if(err) throw err;
        callback(null,isMatch);
    });
}








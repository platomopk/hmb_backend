const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
const Moment = require('moment');
const MomentRange = require('moment-range');
const moment = MomentRange.extendMoment(Moment);

//user schema
const SchoolSchema = mongoose.Schema({
    city:{
        type: String
    },
    name:{
        type:String,
        unique:true
    },
    phone:{
        type:String
    },
    address:{
        type:String
    },
    location:{
        type:String
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String
    },
    activated:{
        type:Boolean,
        default:false
    },
    suspended:{
        type:Boolean,
        default:false
    },
    created:{
        type:Date,
        default:moment.utc().toDate()
    }
});

//to get this function from outside, export it
const School = module.exports = mongoose.model('School',SchoolSchema);


module.exports.getSchoolById = function(id, callback){
    School.findById(id,callback);
}

module.exports.getSchoolByEmail = function(email, callback){
    const query = {email: email};
    School.findOne(query,callback);
}

module.exports.addSchool = function(newSchool, callback){
    
    bcrypt.genSalt(10, (err,salt)=>{
        bcrypt.hash(newSchool.password,salt,(err,hash)=>{
            if(err){
                throw err;
                //res.json({success:false,msg:err});
            }else{
                //res.json({success:false,msg:err});
                newSchool.password = hash;
                newSchool.save(callback);
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








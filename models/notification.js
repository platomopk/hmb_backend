const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
const Moment = require('moment');
const MomentRange = require('moment-range');
const moment = MomentRange.extendMoment(Moment);

//user schema
const NotificationSchema = mongoose.Schema({
    userid:{
        type: String
    },
    content:{
        type:String
    },
    created:{
        type:Date,
        default:moment.utc().add(5,'hours').toDate()
    }
});

//to get this function from outside, export it
const Notification = module.exports = mongoose.model('Notification',NotificationSchema);









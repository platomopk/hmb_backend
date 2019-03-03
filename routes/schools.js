const express = require('express');
const router = express.Router();
const School = require('../models/school');
const User = require('../models/user');
const Notification = require('../models/notification');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
var base64Img = require('base64-img');
const fs = require('fs');
var cloudinary = require('cloudinary');
const bcrypt = require('bcryptjs');
var FCM = require('fcm-node');
var ObjectId = require("mongodb").ObjectId;
var fcm = new FCM('AAAA6Sl4xvU:APA91bFsWP-fhqFzA6rOljdeho2gOyvhS0WjyocWD2wlsWpOUQ-GBUW0tJEZh_TbtOF-NEqZ--1affJOsVf91A5GknqBJGYS5WbD3BaK34_ytkedb8NtV_PNI4XNjU5rdR46XvT98XrI');

//registerparent
router.post('/register', (req, res) => {

    //res.send("Register");
    let school = new School({
        address: req.body.address,
        city: req.body.city,
        email: req.body.email,
        location: req.body.location,
        name: req.body.name,
        password: req.body.password,
        phone: req.body.phone
    });
    School.addSchool(school, (err, school) => {
        if (err) {
            res.json({ success: false, error: "Failed to register school." + err })
        } else {
            res.json({ success: true, data: "School registered" })
        }
    });
});

//authenticateuser
router.post('/authenticate', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    School.getSchoolByEmail(email, (err, school) => {
        if (err) {
            throw err;
        }

        if (!school) {
            console.log("not found")
            res.json({ success: false, error: 'school not found' });
            return;
        }

        School.comparePassword(password, school.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                //create token
                const token = jwt.sign(school.toJSON(), config.secret, {
                    expiresIn: 604800 //1 week in seconds
                });

                res.json({
                    success: true,
                    token: 'bearer ' + token,
                    school: school
                });


            } else {
                return res.json({ success: false, error: 'wrong password' });
            }
        });
    });
});

router.post('/getschool', (req, res) => {
    const city = req.body.city;

    School.find(
        {
            city: city,
            activated: true,
            suspended: false
        },
        (err, docx) => {
            if (err) {
                res.json({
                    success: false,
                    error: err
                })
            }
            if (docx.length > 0) {
                res.json({
                    success: true,
                    data: docx
                })
            } else {
                res.json({
                    success: false,
                    error: "No Schools Found."
                })
            }
        }
    )
});

router.get('/', (req, res) => {
    School.find(
        {
            activated: true,
            suspended: false
        },
        (err, docx) => {
            if (err) {
                res.json({
                    success: false,
                    error: err
                })
            }
            if (docx.length > 0) {
                res.json({
                    success: true,
                    data: docx
                })
            } else {
                res.json({
                    success: false,
                    error: "No Schools Found."
                })
            }
        }
    )
});

router.put('/profile/password', (req, res) => {

    School.findOne(
        {
            _id: req.body.id
        },
        (err, doc) => {
            if (err) {
                res.json({
                    success: false,
                    error: err
                })
            } else {
                if (doc != null) {
                    School.comparePassword(req.body.oldpassword, doc.password, (err, isMatch) => {
                        if (err) throw err;
                        if (isMatch) {
                            bcrypt.genSalt(10, (err, salt) => {
                                bcrypt.hash(req.body.newpassword, salt, (err, hash) => {
                                    if (err) {
                                        throw err;
                                        //res.json({success:false,msg:err});
                                    } else {
                                        //res.json({success:false,msg:err});
                                        School.findOneAndUpdate(
                                            {
                                                _id: req.body.id,
                                            },
                                            {
                                                password: hash
                                            },
                                            (err, doc) => {
                                                if (err) {
                                                    res.json({
                                                        success: false,
                                                        error: err
                                                    })
                                                } else {
                                                    res.json({
                                                        success: true,
                                                        doc: doc
                                                    })
                                                }
                                            }
                                        );
                                    }

                                });
                            });
                        } else {
                            return res.json({ success: false, error: 'wrong password' });
                        }
                    })
                } else {
                    res.json({
                        success: false,
                        error: 'account not found'
                    })
                }
            }
        }
    );
});

router.post('/profile', (req, res) => {
    var id = req.body.id;
    School.findById(id, (err, school) => {
        if (err) {
            res.json({
                success: false,
                error: err
            })
        } else {
            res.json({
                success: true,
                data: school
            })
        }
    })
});

router.put('/profile', (req, res) => {
    School.findOneAndUpdate(
        {
            _id: req.body.id,
        },
        {
            name: req.body.name,
            phone: req.body.phone
        },
        (err, doc) => {
            if (err) {
                res.json({
                    success: false,
                    error: err
                })
            } else {
                res.json({
                    success: true,
                    doc: doc
                })
            }
        }
    );
});

router.post('/children/verify', (req, res) => {

    var schoolname = req.body.schoolname;
    User.aggregate([
        { $unwind: "$childs" },
        {
            $match:
            {
                "childs.schoolname": schoolname,
                "childs.isverified": false
            }
        },
        {
            $project: {
                _id: 0,
                _id: "$childs._id",
                picture: "$childs.picture",
                fullname: "$childs.fullname",
                gender: "$childs.gender",
                cnic: "$childs.cnic",
                grade: "$childs.grade",
                section: "$childs.section",
                rollnumber: "$childs.rollnumber"
            }
        }

    ], function (err, result) {
        if (err) {
            res.json({
                success: false,
                error: err
            })
        }
        if (result.length > 0) {
            res.json({
                success: true,
                data: result
            })
        } else {
            res.json({
                success: false,
                error: "No Children Found."
            })
        }
    });


});

router.post('/children/get/name', (req, res) => {

    var schoolname = req.body.schoolname;
    var name = req.body.fullname;

    User.aggregate([
        { $unwind: "$childs" },
        {
            $match:
            {
                "childs.schoolname": {
                    $regex: new RegExp('^' + schoolname, 'i')
                },
                "childs.fullname": {
                    $regex: new RegExp('^' + name, 'i')
                },
                "childs.isverified": true
            }
        },
        {
            $project: {
                _id: 0,
                _id: "$childs._id",
                picture: "$childs.picture",
                fullname: "$childs.fullname",
                gender: "$childs.gender",
                cnic: "$childs.cnic",
                grade: "$childs.grade",
                section: "$childs.section",
                rollnumber: "$childs.rollnumber"
            }
        }

    ], function (err, result) {
        if (err) {
            res.json({
                success: false,
                error: err
            })
        }
        if (result.length > 0) {
            res.json({
                success: true,
                data: result
            })
        } else {
            res.json({
                success: false,
                error: "No Children Found."
            })
        }
    });


});

router.post('/children/get/rollnumber', (req, res) => {

    var schoolname = req.body.schoolname;
    var rollnumber = req.body.rollnumber;

    User.aggregate([
        { $unwind: "$childs" },
        {
            $match:
            {
                "childs.schoolname": schoolname,
                "childs.rollnumber": rollnumber,
                "childs.isverified": true
            }
        },
        {
            $project: {
                _id: 0,
                _id: "$childs._id",
                picture: "$childs.picture",
                fullname: "$childs.fullname",
                gender: "$childs.gender",
                cnic: "$childs.cnic",
                grade: "$childs.grade",
                section: "$childs.section",
                rollnumber: "$childs.rollnumber"
            }
        }

    ], function (err, result) {
        if (err) {
            res.json({
                success: false,
                error: err
            })
        }
        if (result.length > 0) {
            res.json({
                success: true,
                data: result
            })
        } else {
            res.json({
                success: false,
                error: "No Children Found."
            })
        }
    });


});

router.post('/drivers/get/cnic', (req, res) => {

    var schoolname = req.body.schoolname;
    var cnic = req.body.cnic;

    User.find(
        {
            cnic: cnic,
            schools: schoolname
        },
        (err, docx) => {
            if (err) {
                res.json({
                    success: false,
                    error: err
                })
            }
            if (docx.length > 0) {
                res.json({
                    success: true,
                    data: docx
                })
            } else {
                res.json({
                    success: false,
                    error: "No Drivers Found."
                })
            }
        }
    )

});

router.post('/drivers/getall', (req, res) => {
    var schoolname = req.body.schoolname;
    User.find(
        {
            schools: schoolname
        },
        (err, docx) => {
            if (err) {
                res.json({
                    success: false,
                    error: err
                })
            }
            if (docx.length > 0) {
                res.json({
                    success: true,
                    data: docx
                })
            } else {
                res.json({
                    success: false,
                    error: "No Drivers Found."
                })
            }
        }
    )

});

router.post('/drivers/get/regid', (req, res) => {

    var schoolname = req.body.schoolname;
    var regid = req.body.regid;

    User.find(
        {
            carregistration: regid,
            schools: schoolname
        },
        (err, docx) => {
            if (err) {
                res.json({
                    success: false,
                    error: err
                })
            }
            if (docx.length > 0) {
                res.json({
                    success: true,
                    data: docx
                })
            } else {
                res.json({
                    success: false,
                    error: "No Drivers Found."
                })
            }
        }
    )

});



router.post('/drivers/verify', (req, res) => {

    var schoolname = req.body.schoolname;

    User.find(
        {
            schools: schoolname,
            activated: false
        },
        (err, docx) => {
            if (err) {
                res.json({
                    success: false,
                    error: err
                })
            }
            if (docx.length > 0) {
                res.json({
                    success: true,
                    data: docx
                })
            } else {
                res.json({
                    success: false,
                    error: "No Drivers Found."
                })
            }
        }
    )



});

router.post('/drivers/markverify', (req, res) => {
    var id = req.body.id;

    User.findOneAndUpdate(
        {
            _id: id
        },
        {
            activated: true
        },
        (err, resp) => {
            if (err) {
                res.json({
                    success: false,
                    error: err
                })
            }
            res.json({
                success: true,
                data: resp
            })
        }
    );
})


router.post('/children/markverify', (req, res) => {
    var id = req.body.id;
    console.log(id);

    User.findOneAndUpdate(
        {
            'childs._id': id
        },
        {
            'childs.$.isverified': true
        },
        (err, resp) => {
            if (err) {
                res.json({
                    success: false,
                    error: err
                })
            }
            res.json({
                success: true,
                data: resp
            })
        }
    );
})

router.post('/children/getdriverless', (req, res) => {

    var schoolname = req.body.schoolname;

    User.aggregate([
        { $unwind: "$childs" },
        {
            $match:
            {
                "childs.schoolname": schoolname,
                "childs.isverified": true,
                "childs.driveradded": false
            }
        },
        {
            $project: {
                _id: 0,
                _id: "$childs._id",
                picture: "$childs.picture",
                fullname: "$childs.fullname",
                gender: "$childs.gender",
                cnic: "$childs.cnic",
                grade: "$childs.grade",
                section: "$childs.section",
                rollnumber: "$childs.rollnumber"
            }
        }

    ], function (err, result) {
        if (err) {
            res.json({
                success: false,
                error: err
            })
        }
        if (result.length > 0) {
            res.json({
                success: true,
                data: result
            })
        } else {
            res.json({
                success: false,
                error: "No Children Found."
            })
        }
    });


});

router.post('/placechild', (req, res) => {
    var schoolname = req.body.schoolname;
    var childid = req.body.childid;
    var driverid = req.body.driverid;

    User.findOneAndUpdate(
        {
            _id: driverid,
            schools: schoolname
        },
        {
            $addToSet: {
                allotedchildids: childid
            }
        },
        (err, doc) => {
            if (err) {
                res.json({
                    success: false,
                    error: err
                })
            }

            User.findOne(
                {
                    _id: driverid
                },
                (err, driver) => {
                    if (err) {
                        throw err;
                    }
                    if (driver) {

                        User.findOne(
                            {
                                'childs._id': childid
                            },
                            {
                                usertoken: 1,
                                childs: {
                                    $elemMatch: {
                                        _id: childid
                                    }
                                }
                            },
                            (err, doc) => {
                                if (err) {
                                    res.json({
                                        success: false,
                                        error: err
                                    })
                                }

                                User.updateOne(
                                    {
                                        'childs._id': childid
                                    },
                                    {
                                        'childs.$.driveradded': true,
                                        'childs.$.driverid': driverid,
                                    },
                                    (err, raw) => {
                                        if (err) {
                                            throw err;
                                        }

                                        var message = {
                                            to: doc.usertoken,

                                            data: {  //you can send only notification or only data(or include both)
                                                title: 'HMB - Notification',
                                                content: "'" + driver.fullname + "' has been assigned to give pick/drop service for your child '" + doc.childs[0].fullname + "'. Driver's credentials are \n\nPhone: " + driver.phone + "\nCNIC: " + driver.cnic + "\nCar: " + driver.carregistration
                                            }
                                        };

                                        fcm.send(message, function (err, response) {
                                            if (err) {
                                                res.json({
                                                    success: false,
                                                    error: err
                                                })
                                            } else {
                                                if (response) {
                                                    let notification = new Notification({
                                                        userid: doc._id,
                                                        content: "'" + driver.fullname + "' has been assigned to give pick/drop service for your child '" + doc.childs[0].fullname + "'. Driver's credentials are \n\nPhone: " + driver.phone + "\nCNIC: " + driver.cnic + "\nCar: " + driver.carregistration
                                                    });
                                                    notification.save(function (err) {
                                                        if (err) {
                                                            res.json({
                                                                success: false,
                                                                error: err
                                                            })
                                                        }
                                                        res.json({
                                                            success: true,
                                                            data: response
                                                        })
                                                    });
                                                } else {
                                                    res.json({
                                                        success: false,
                                                        error: "Not Updated."
                                                    })
                                                }
                                            }
                                        });
                                    }
                                )


                            }
                        );
                    }
                }
            )





        }
    );

});

router.post('/drivers/getavailabledrivers', (req, res) => {

    var schoolname = req.body.schoolname;

    User.find(
        {
            schools: schoolname,
            activated: true,
            suspended: false
        },
        (err, docx) => {
            if (err) {
                res.json({
                    success: false,
                    error: err
                })
            }
            if (docx.length > 0) {
                res.json({
                    success: true,
                    data: docx
                })
            } else {
                res.json({
                    success: false,
                    error: "No Drivers Found."
                })
            }
        }
    );



});


router.post('/drivers/track', (req, res) => {
    var driverid = req.body.driverid;

    User.findOne(
        {
            _id: driverid
        },
        (err, docx) => {
            if (err) {
                res.json({
                    success: false,
                    error: err
                })
            }
            if (docx != null) {

                

                var arr = docx.activatedchilds;
            //    console.log(arr)

                User.aggregate([
                    { 
                        $unwind: "$childs" 
                    },
                    {
                        $match : {
                            "childs.driverid": driverid
                        }
                    },
                    {
                        $project: {
                            _id: 0,
                            _cid: "$childs._id",
                            picture: "$childs.picture",
                            fullname: "$childs.fullname",
                            gender: "$childs.gender",
                            cnic: "$childs.cnic",
                            grade: "$childs.grade",
                            section: "$childs.section",
                            rollnumber: "$childs.rollnumber",
                            schoolname:"$childs.schoolname",
                            schoolcity:"$childs.schoolcity",
                            athome:"$childs.athome",
                            enroute:"$childs.enroute",
                            atschool:"$childs.atschool",
            
                        }
                    },
            
                ], function (err, result) {
                    if (err) {
                        res.json({
                            success: false,
                            error: err
                        })
                    }
                    if (result.length>0) {

                        var newresult= [];

                        result.forEach(function(element) {


                            docx.activatedchilds.forEach(function(element2) {
                                if(element2 == element._cid){
                                    newresult.push(element);
                                }
                            }, this);

                        }, this);



                        res.json({
                            success: true,
                            data: newresult,
                            location:docx.lastknown
                        })
                    } else {
                        res.json({
                            success: false,
                            error: "No Children Found."
                        })
                    }
                });


            } else {
                res.json({
                    success: false,
                    error: "No Drivers Found."
                })
            }
        }
    )

});

// router.get('/profile', passport.authenticate('jwt',{session:false}), (req, res, next)=>{

//     res.send(req.user);
// });



//export
module.exports = router;
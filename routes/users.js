const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Notification = require('../models/notification');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
var base64Img = require('base64-img');
const fs = require('fs');
var cloudinary = require('cloudinary');
var FCM = require('fcm-node');
var fcm = new FCM('AAAA6Sl4xvU:APA91bFsWP-fhqFzA6rOljdeho2gOyvhS0WjyocWD2wlsWpOUQ-GBUW0tJEZh_TbtOF-NEqZ--1affJOsVf91A5GknqBJGYS5WbD3BaK34_ytkedb8NtV_PNI4XNjU5rdR46XvT98XrI');


//registerparent
router.post('/registerparent', (req, res)=>{
    var dir = "./uploads/";
    cloudinary.config({ 
        cloud_name: 'devlabs-pakistan', 
        api_key: '313335615588774', 
        api_secret: 'cqU-1QHEw8JyrfRiyuEDG0F7u48' 
      });

    //res.send("Register");
    let newUser = new User({
        fullname: req.body.fullname,
        gender: req.body.gender,
        cnic: req.body.cnic,
        phone: req.body.phone,
        landline: req.body.landline,
        city: req.body.city,
        address: req.body.address,
        usertoken:req.body.usertoken,
        picturename: req.body.picturename,
        homelocation: req.body.homelocation,
        email: req.body.email,
        password: req.body.password,
        account:"parent",
        picture: req.body.picture,
    });

    const decodedImage = new Buffer(newUser.picture,'base64');
    fs.writeFile(dir+newUser.picturename,decodedImage,(err)=>{
        if(err){
            res.json({
                success:false,
                error:err
            });
            console.log(err);
        }else{
            const imagepath = newUser.picturename;
            newUser.picture = imagepath;

            cloudinary.v2.uploader.upload(
                dir+newUser.picturename
                ,
                {
                    overwrite:true,
                    invalidate:true,
                    crop:"fill"
                },
                function(err,result){
                    if(err){
                        res.json({success:false,error:"Failed to register parent user."+ err})
                    }else{
                        newUser.picture = result.secure_url;
                        User.addUser(newUser, (err,user)=>{
                            if(err){
                                res.json({success:false,error:"Failed to register parent user."+ err})
                            }else{
                                res.json({success:true, data:"Parent registered"})
                            }
                        });
                    }
                }
            )
           
        }
    });
});

router.post('/registerdriver', (req, res)=>{
    var dir = "./uploads/";
    cloudinary.config({ 
        cloud_name: 'devlabs-pakistan', 
        api_key: '313335615588774', 
        api_secret: 'cqU-1QHEw8JyrfRiyuEDG0F7u48' 
      });


    //res.send("Register");
    let newUser = new User({
        fullname: req.body.fullname,
        gender: req.body.gender,
        cnic: req.body.cnic,
        phone: req.body.phone,
        address: req.body.address,
        usertoken:req.body.usertoken,
        picturename: req.body.picturename,
        email: req.body.email,
        password: req.body.password,
        account:"driver",
        driverschoolname:req.body.driverschoolname,
        picture: req.body.picture,
        carregistration:req.body.carregistration,
        seatingcapacity:req.body.seatingcapacity,
        schools:req.body.schools.toString().split(",")
    });

    console.log(req.body.schools)

    const decodedImage = new Buffer(newUser.picture,'base64');
    fs.writeFile(dir+newUser.picturename,decodedImage,(err)=>{
        if(err){
            res.json({
                success:false,
                error:err
            });
            console.log(err);
        }else{
            const imagepath = newUser.picturename;
            newUser.picture = imagepath;

            cloudinary.v2.uploader.upload(
                dir+newUser.picturename
                ,
                {
                    overwrite:true,
                    invalidate:true,
                    crop:"fill"
                },
                function(err,result){
                    if(err){
                        res.json({success:false,error:"Failed to register driver user."+ err})
                    }else{
                        newUser.picture = result.secure_url;
                        User.addUser(newUser, (err,user)=>{
                            if(err){
                                res.json({success:false,error:"Failed to register driver user."+ err})
                            }else{
                                res.json({success:true, data:"Driver registered"})
                            }
                        });
                    }
                }
            )
           
        }
    });
});

router.post('/registerchild', (req, res)=>{
    var dir = "./uploads/";
    cloudinary.config({ 
        cloud_name: 'devlabs-pakistan', 
        api_key: '313335615588774', 
        api_secret: 'cqU-1QHEw8JyrfRiyuEDG0F7u48' 
      });

    let child = {
        fullname:req.body.fullname,
        gender:req.body.gender,
        cnic:req.body.cnic,
        schoolcity:req.body.schoolcity,
        schoolname:req.body.schoolname,
        grade:req.body.grade,
        section:req.body.section,
        rollnumber:req.body.rollnumber,
        schoollocation:req.body.schoollocation,
        picture:"",
        createdby:req.body.createdby,
        isverified:false
    };

    const decodedImage = new Buffer(req.body.picture,'base64');
    fs.writeFile(dir+req.body.picturename,decodedImage,(err)=>{
        if(err){
            res.json({
                success:false,
                error:err
            });
            console.log(err);
        }else{
            const imagepath = req.body.picturename;
            child.picture = imagepath;

            cloudinary.v2.uploader.upload(
                dir+req.body.picturename
                ,
                {
                    overwrite:true,
                    invalidate:true,
                    crop:"fill"
                },
                function(err,result){
                    if(err){
                        res.json({success:false,error:"Failed to register parent user."+ err})
                    }else{
                        child.picture = result.secure_url;

                        User.findOneAndUpdate(
                            {
                                email:child.createdby,
                                'childs.cnic':{
                                    $ne:child.cnic
                                }
                            },
                            {
                                $push:{
                                    childs:child
                                }
                            },
                            {
                                new:true
                            },
                            (err,doc)=>{
                                if(err){
                                    res.json({success:false,error:"Failed to register parent user."+ err})
                                }else{
                                    if(doc == null){
                                        res.json({success:false, error:"Child already present with the same cnic."})
                                    }else{
                                        res.json({success:true, data:doc})
                                    }
                                    
                                }
                            }
                        )
                    }
                }
            )


        }
    });
});

router.post('/childs',(req,res)=>{
    User.find(
        {
            email:req.body.createdby
        },
        
            'childs'          
        ,
        {
            $sort:{
                created:-1
            }
        },
        (err,docx)=>{
            if(err){
                res.json({
                    success:false,
                    error:err
                })
            }else{
                if(docx.length>0){
                    res.json({
                        success:true,
                        data:docx
                    })
                }else{
                    res.json({
                        success:false,
                        error:"no childs found"
                    })
                }
                
            }
        }
    )
})

router.post('/child/delete',(req,res)=>{

    User.findOneAndUpdate(

        {
            email:req.body.createdby,
            'childs._id':req.body.childid
        },
        {
            $pull:{
                'childs':{
                    _id:req.body.childid
                }
            }
        },
        (err,docx)=>{
            if(err){
                res.json({
                    success:false,
                    error:err
                })
            }else{
                if(docx!=null){
                    res.json({
                        success:true,
                        data:docx
                    })
                }else{
                    res.json({
                        success:false,
                        error:"not deleted"
                    })
                }
                
            }
        }

    );




})

router.post('/updateparent',(req,res)=>{
    var dir = "./uploads/";
    let newUser;
    cloudinary.config({ 
        cloud_name: 'devlabs-pakistan', 
        api_key: '313335615588774', 
        api_secret: 'cqU-1QHEw8JyrfRiyuEDG0F7u48' 
      });
    
    if(req.body.edited == "yes"){
        //res.send("Register");
        newUser = {
            id: req.body.id,
            fullname: req.body.fullname,
            gender: req.body.gender,
            cnic: req.body.cnic,
            phone: req.body.phone,
            landline: req.body.landline,
            city: req.body.city,
            address: req.body.address,
            picturename: req.body.picturename,
            homelocation: req.body.homelocation,
            picture: req.body.picture,
        };

        const decodedImage = new Buffer(newUser.picture,'base64');
        fs.writeFile(dir+newUser.picturename,decodedImage,(err)=>{
            if(err){
                res.json({
                    success:false,
                    error:err
                });
                console.log(err);
            }else{
                const imagepath = newUser.picturename;
                newUser.picture = imagepath;

                cloudinary.v2.uploader.upload(
                    dir+newUser.picturename
                    ,
                    {
                        overwrite:true,
                        invalidate:true,
                        crop:"fill"
                    },
                    function(err,result){
                        if(err){
                            res.json({success:false,error:"Failed to update parent user."+ err})
                        }else{
                            newUser.picture = result.secure_url;

                            User.updateOne({_id:newUser.id},{
                                picture:newUser.picture,
                                picturename:newUser.picture,
                                fullname:newUser.fullname,
                                gender:newUser.gender,
                                cnic:newUser.cnic,
                                phone:newUser.phone,
                                landline:newUser.landline,
                                address:newUser.address,
                                city:newUser.city
                            },(err,resp)=>{
                                if(err){
                                    res.json({success:false,error:"Failed to update parent user."+ err})
                                }else{
                                    res.json({success:true, data:"Parent updated",fullname:newUser.fullname,picture:newUser.picture})
                                }
                            });
                        }
                    }
                )



                
            }
        });
    }else{
        //res.send("Register");
        newUser ={
            id: req.body.id,
            fullname: req.body.fullname,
            gender: req.body.gender,
            cnic: req.body.cnic,
            phone: req.body.phone,
            landline: req.body.landline,
            city: req.body.city,
            address: req.body.address,
            homelocation: req.body.homelocation
        };
    
        User.updateOne({_id:newUser.id},{
            fullname:newUser.fullname,
            gender:newUser.gender,
            cnic:newUser.cnic,
            phone:newUser.phone,
            landline:newUser.landline,
            address:newUser.address,
            city:newUser.city
        },(err,resp)=>{
            if(err){
                res.json({success:false,error:"Failed to update parent user."+ err})
            }else{
                res.json({success:true, data:"Parent updated",fullname:newUser.fullname,picture:"empty"})
            }
        });
    }

        
});

router.post('/updatedriver',(req,res)=>{
    var dir = "./uploads/";
    let newUser;
    cloudinary.config({ 
        cloud_name: 'devlabs-pakistan', 
        api_key: '313335615588774', 
        api_secret: 'cqU-1QHEw8JyrfRiyuEDG0F7u48' 
      });
    
    if(req.body.edited == "yes"){
        //res.send("Register");
        newUser = {
            id: req.body.id,
            fullname: req.body.fullname,
            gender: req.body.gender,
            cnic: req.body.cnic,
            phone: req.body.phone,
            address: req.body.address,
            picturename: req.body.picturename,
            picture: req.body.picture,
        };

        const decodedImage = new Buffer(newUser.picture,'base64');
        fs.writeFile(dir+newUser.picturename,decodedImage,(err)=>{
            if(err){
                res.json({
                    success:false,
                    error:err
                });
                console.log(err);
            }else{
                const imagepath = newUser.picturename;
                newUser.picture = imagepath;

                cloudinary.v2.uploader.upload(
                    dir+newUser.picturename
                    ,
                    {
                        overwrite:true,
                        invalidate:true,
                        crop:"fill"
                    },
                    function(err,result){
                        if(err){
                            res.json({success:false,error:"Failed to update parent user."+ err})
                        }else{
                            newUser.picture = result.secure_url;

                            User.updateOne({_id:newUser.id},{
                                picture:newUser.picture,
                                picturename:newUser.picture,
                                fullname:newUser.fullname,
                                gender:newUser.gender,
                                cnic:newUser.cnic,
                                phone:newUser.phone,
                                address:newUser.address,
                                carregistration:req.body.carregistration,
                                seatingcapacity:req.body.seatingcapacity
                            },(err,resp)=>{
                                if(err){
                                    res.json({success:false,error:"Failed to update parent user."+ err})
                                }else{
                                    res.json({success:true, data:"Parent updated",fullname:newUser.fullname,picture:newUser.picture})
                                }
                            });
                        }
                    }
                )



                
            }
        });
    }else{
        //res.send("Register");
        newUser ={
            id: req.body.id,
            fullname: req.body.fullname,
            gender: req.body.gender,
            cnic: req.body.cnic,
            phone: req.body.phone,
            address: req.body.address
        };
    
        User.updateOne({_id:newUser.id},{
            fullname:newUser.fullname,
            gender:newUser.gender,
            cnic:newUser.cnic,
            phone:newUser.phone,
            address:newUser.address,
            carregistration:req.body.carregistration,
            seatingcapacity:req.body.seatingcapacity
        },(err,resp)=>{
            if(err){
                res.json({success:false,error:"Failed to update parent user."+ err})
            }else{
                res.json({success:true, data:"Parent updated",fullname:newUser.fullname,picture:"empty"})
            }
        });
    }

        
});

router.post('/updatechild',(req,res)=>{
    var dir = "./uploads/";
    let newUser;
    cloudinary.config({ 
        cloud_name: 'devlabs-pakistan', 
        api_key: '313335615588774', 
        api_secret: 'cqU-1QHEw8JyrfRiyuEDG0F7u48' 
      });
    
    if(req.body.edited == "yes"){

        const decodedImage = new Buffer(req.body.picture,'base64');
        fs.writeFile(dir+req.body.picturename,decodedImage,(err)=>{
            if(err){
                res.json({
                    success:false,
                    error:err
                });
                console.log(err);
            }else{
                const imagepath = req.body.picturename;
                req.body.picture = imagepath;

                cloudinary.v2.uploader.upload(
                    dir+req.body.picturename
                    ,
                    {
                        overwrite:true,
                        invalidate:true,
                        crop:"fill"
                    },
                    function(err,result){
                        if(err){
                            res.json({success:false,error:"Failed to update parent user."+ err})
                        }else{
                            req.body.picture = result.secure_url;

                            User.updateOne(
                                {
                                    email:req.body.createdby,
                                    'childs._id':req.body.id
                                },
                                {
                                    'childs.$.picture':req.body.picture,
                                    'childs.$.fullname':req.body.fullname,
                                    'childs.$.gender':req.body.gender,
                                    'childs.$.cnic':req.body.cnic,
                                    'childs.$.schoolcity':req.body.schoolcity,
                                    'childs.$.schoolname':req.body.schoolname,
                                    'childs.$.grade':req.body.grade,
                                    'childs.$.rollnumber':req.body.rollnumber,
                                    'childs.$.section':req.body.section
                                },
                                (err,resp)=>{
                                    if(err){
                                        console.log(err);
                                        res.json({success:false,error:"Failed to update child ."+ err})
                                    }else{
                                        res.json({success:true, data:"Parent updated"})
                                    }
                            });
                            
                        }
                    }
                )

                
            }
        });
    }else{
        //res.send("Register");
        User.updateOne(
            {
                email:req.body.createdby,
                'childs._id':req.body.id
            },
            {
                'childs.$.fullname':req.body.fullname,
                'childs.$.gender':req.body.gender,
                'childs.$.cnic':req.body.cnic,
                'childs.$.schoolcity':req.body.schoolcity,
                'childs.$.schoolname':req.body.schoolname,
                'childs.$.grade':req.body.grade,
                'childs.$.rollnumber':req.body.rollnumber,
                'childs.$.section':req.body.section
            },
            (err,resp)=>{
                if(err){
                    console.log(err);
                    res.json({success:false,error:"Failed to update child ."+ err})
                }else{
                    res.json({success:true, data:"Child updated"})
                }
        });
    
    }

        
});

//authenticateuser
router.post('/authenticate', (req, res)=>{
    const email = req.body.email;
    const password = req.body.password;
    const usertoken = req.body.usertoken;

    User.getUserByEmail(email, (err,user)=>{
        if(err){
            throw err;
        }

        if(!user){
            console.log("not found")
            res.json({success:false, error:'user not found'});
            return;
        }

        User.comparePassword(password, user.password, (err, isMatch)=>{
            if(err) throw err;
            if(isMatch){
                //create token
                const token = jwt.sign(user.toJSON(),config.secret,{
                    expiresIn:604800 //1 week in seconds
                });

                User.updateOne({email:user.email},{usertoken:usertoken},function(err,resp){
                    if(err){
                        res.json({success:false, error:err});
                    }else{
                        res.json({
                            success:true,
                            token:'bearer '+token,
                            data:{
                                id:user._id,
                                name:user.fullname,
                                email:user.email,
                                account:user.account,
                                picture:user.picture
                            }
                        });
                    }
                })


            }else{
                return res.json({success:false, error:'wrong password'});
            }
        });
    });
});

router.post('/profile',(req,res)=>{
    var id = req.body.id;
    User.findById(id,(err,user)=>{
        if(err){
            res.json({
                success:false,
                error:err
            })
        }else{
            res.json({
                success:true,
                data:user
            })
        }
    })
});


router.post('/parentnotification',(req,res)=>{
    var userid = req.body._id;
    var drivername = req.body.drivername;
    var content = req.body.content;

    User.findOne(
        {
            _id:userid
        },
        (err,doc)=>{
            if(err){
                res.json({
                    success: false,
                    error: err
                })
            }
            var message = {
                to: doc.usertoken,

                data: {  //you can send only notification or only data(or include both)
                    title: 'HMB - Notification',
                    content: content
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
                            userid:userid,
                            content:content
                        });
                        notification.save(function(err){
                            if (err) {
                                res.json({
                                    success: false,
                                    error: err
                                })
                            }
                            res.json({
                                success: true,
                                data: doc
                            })
                        });
                    } else {
                        res.json({
                            success: false,
                            error: "Not found."
                        })
                    }
                }
            });
        }
    )
});

router.post('/drivermarkpresent',(req,res)=>{
    var childid = req.body.childid;
    var driverid = req.body.driverid;
    var fullname = req.body.fullname;

    User.findOneAndUpdate(
        {
            'childs._id':childid
        },
        {
            'childs.$.athome':false,
            'childs.$.enroute':true,
            'childs.$.atschool':false
        },
        {
            new:true
        },
        (err,doc)=>{
            if(err){
                res.json({
                    success: false,
                    error: err
                })
            }
            var message = {
                to: doc.usertoken,

                data: {  //you can send only notification or only data(or include both)
                    title: 'HMB - Notification',
                    content: fullname + " is in the van. Now, you can track the van's location."
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

                        User.findOneAndUpdate(
                            {
                                _id:driverid
                            },
                            {
                                $addToSet: {
                                    activatedchilds: childid
                                }
                            },
                            (err,docq)=>{
                                if (err) {
                                    res.json({
                                        success: false,
                                        error: err
                                    })
                                }

                                let notification = new Notification({
                                    userid:doc._id,
                                    content:fullname + " is in the van. Now, you can track the van's location."
                                });
                                notification.save(function(err){
                                    if (err) {
                                        res.json({
                                            success: false,
                                            error: err
                                        })
                                    }
                                    res.json({
                                        success: true,
                                        data: doc
                                    })
                                });

                            }
                        )




                        
                    } else {
                        res.json({
                            success: false,
                            error: "Not found."
                        })
                    }
                }
            });
        }
    )
});

router.post('/driverdropschool',(req,res)=>{
    var childid = req.body.childid;
    var driverid = req.body.driverid;
    var fullname = req.body.fullname;

    User.findOneAndUpdate(
        {
            'childs._id':childid
        },
        {
            'childs.$.athome':false,
            'childs.$.enroute':false,
            'childs.$.atschool':true,
        },
        {
            new:true
        },
        (err,doc)=>{
            if(err){
                res.json({
                    success: false,
                    error: err
                })
            }
            var message = {
                to: doc.usertoken,

                data: {  //you can send only notification or only data(or include both)
                    title: 'HMB - Notification',
                    content: fullname + " has been successfully dropped at school."
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
                        User.findOneAndUpdate(
                            {
                                _id:driverid
                            },
                            {
                                $pull: {
                                    activatedchilds: childid
                                }
                            },
                            (err,docq)=>{
                                if (err) {
                                    res.json({
                                        success: false,
                                        error: err
                                    })
                                }
                                let notification = new Notification({
                                    userid:doc._id,
                                    content:fullname + " has been successfully dropped at school."
                                });
                                notification.save(function(err){
                                    if (err) {
                                        res.json({
                                            success: false,
                                            error: err
                                        })
                                    }
                                    res.json({
                                        success: true,
                                        data: doc
                                    })
                                });

                            }
                        )
                    } else {
                        res.json({
                            success: false,
                            error: "Not found."
                        })
                    }
                }
            });
        }
    )
});

router.post('/driverdrophome',(req,res)=>{
    var childid = req.body.childid;
    var driverid = req.body.driverid;
    var fullname = req.body.fullname;

    User.findOneAndUpdate(
        {
            'childs._id':childid
        },
        {
            'childs.$.athome':true,
            'childs.$.enroute':false,
            'childs.$.atschool':false,
        },
        {
            new:true
        },
        (err,doc)=>{
            if(err){
                res.json({
                    success: false,
                    error: err
                })
            }
            var message = {
                to: doc.usertoken,

                data: {  //you can send only notification or only data(or include both)
                    title: 'HMB - Notification',
                    content: fullname + " has been successfully dropped at home."
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
                        User.findOneAndUpdate(
                            {
                                _id:driverid
                            },
                            {
                                $pull: {
                                    activatedchilds: childid
                                }
                            },
                            (err,docq)=>{
                                if (err) {
                                    res.json({
                                        success: false,
                                        error: err
                                    })
                                }
                                let notification = new Notification({
                                    userid:doc._id,
                                    content:fullname + " has been successfully dropped at home."
                                });
                                notification.save(function(err){
                                    if (err) {
                                        res.json({
                                            success: false,
                                            error: err
                                        })
                                    }
                                    res.json({
                                        success: true,
                                        data: doc
                                    })
                                });

                            }
                        )
                    } else {
                        res.json({
                            success: false,
                            error: "Not found."
                        })
                    }
                }
            });
        }
    )
});

router.post('/driverpickupschool',(req,res)=>{
    var childid = req.body.childid;
    var driverid = req.body.driverid;
    var fullname = req.body.fullname;

    User.findOneAndUpdate(
        {
            'childs._id':childid
        },
        {
            'childs.$.athome':false,
            'childs.$.enroute':true,
            'childs.$.atschool':false,
        },
        {
            new:true
        },
        (err,doc)=>{
            if(err){
                res.json({
                    success: false,
                    error: err
                })
            }
            var message = {
                to: doc.usertoken,

                data: {  //you can send only notification or only data(or include both)
                    title: 'HMB - Notification',
                    content: fullname + " has been successfully picked from school."
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
                        User.findOneAndUpdate(
                            {
                                _id:driverid
                            },
                            {
                                $addToSet: {
                                    activatedchilds: childid
                                }
                            },
                            (err,docq)=>{
                                if (err) {
                                    res.json({
                                        success: false,
                                        error: err
                                    })
                                }
                                let notification = new Notification({
                                    userid:doc._id,
                                    content:fullname + " has been successfully picked from school."
                                });
                                notification.save(function(err){
                                    if (err) {
                                        res.json({
                                            success: false,
                                            error: err
                                        })
                                    }
                                    res.json({
                                        success: true,
                                        data: doc
                                    })
                                });

                            }
                        )
                    } else {
                        res.json({
                            success: false,
                            error: "Not found."
                        })
                    }
                }
            });
        }
    )
});

router.post('/updatedriverloc',(req,res)=>{
    var driverid = req.body.driverid;
    var latlng = req.body.latlng;

    User.findOneAndUpdate(
        {
            _id:driverid
        },
        {
            lastknown:latlng
        },
        (err,doc)=>{
            if(err){
                res.json({
                    success: false,
                    error: err
                })
            }
            res.json({
                success: true,
                data: doc
            })
        }
    )
});

router.post('/getdriverloc',(req,res)=>{
    var childid = req.body.childid;

    User.findOne(
        {
            childs:{
                $elemMatch:{
                    _id:childid,
                    enroute:true
                }
            }
        },
        {
            childs:{
                $elemMatch:{
                    _id:childid,
                    enroute:true
                }
            }
        },
        (err,doc)=>{
            if(doc!=null){
                var driverid = doc.childs[0].driverid;
                
                User.findOne(
                    {
                        _id:driverid
                    },
                    (err,doc)=>{
                        if(err){
                            res.json({
                                success:false,
                                error:err
                            })
                        }
                        if(doc!=null){
                            res.json({
                                success:true,
                                data:doc
                            })
                        }else{
                            res.json({
                                success:false,
                                error:"Driver not found in the system."
                            })
                        }
                    }
                )

            }else{
                res.json({
                    success:false,
                    error:"Child is not with the driver yet."
                })
            }

        }
    )

});

// get alloted children for drivers
router.get('/driver/childs/:driverid/:type',(req,res)=>{
    var driverid = req.params.driverid;
    var type = req.params.type;

    if (type == "pickuphome") {
        User.aggregate([
            { $unwind: "$childs" },
            {
                $match:
                {
                    "childs.driveradded": true,
                    "childs.isverified": true,
                    "childs.driverid": driverid,
                    "childs.athome": true,
                    "childs.enroute": false,
                    "childs.atschool": false
                }
            },
            {
                $project: {
                    _id: 1,
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
    }else 
    if (type == "pickupschool") {
        User.aggregate([
            { $unwind: "$childs" },
            {
                $match:
                {
                    "childs.driveradded": true,
                    "childs.isverified": true,
                    "childs.driverid": driverid,
                    "childs.athome": false,
                    "childs.enroute": false,
                    "childs.atschool": true
                }
            },
            {
                $project: {
                    _id: 1,
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
    } else 
    if (type == "drophome") {
        User.aggregate([
            { $unwind: "$childs" },
            {
                $match:
                {
                    "childs.driveradded": true,
                    "childs.isverified": true,
                    "childs.driverid": driverid,
                    "childs.athome": false,
                    "childs.enroute": true,
                    "childs.atschool": false
                }
            },
            {
                $project: {
                    _id: 1,
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
    } else 
    if (type == "dropschool") {
        User.aggregate([
            { $unwind: "$childs" },
            {
                $match:
                {
                    "childs.driveradded": true,
                    "childs.isverified": true,
                    "childs.driverid": driverid,
                    "childs.athome": false,
                    "childs.enroute": true,
                    "childs.atschool": false
                }
            },
            {
                $project: {
                    _id: 1,
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
    } else {
        res.json({
            success:false,
            error:"Wrong Type"
        })
    }

});
// router.get('/profile', passport.authenticate('jwt',{session:false}), (req, res, next)=>{
    
//     res.send(req.user);
// });
router.post('/getnotifications',(req,res)=>{
    var userid = req.body.userid;

    Notification.find(
        {
            userid:userid
        },
        {},
        {
            sort:{
                created:-1
            }
        },
        (err,docx)=>{
            if(err){
                res.json({
                    success:false,
                    error:err
                })
            }
            res.json({
                success:true,
                data:docx
            })
        }
    )
});



//export
module.exports = router;
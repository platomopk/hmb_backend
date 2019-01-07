const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
var base64Img = require('base64-img');
const fs = require('fs');
var cloudinary = require('cloudinary');

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



// router.get('/profile', passport.authenticate('jwt',{session:false}), (req, res, next)=>{
    
//     res.send(req.user);
// });



//export
module.exports = router;
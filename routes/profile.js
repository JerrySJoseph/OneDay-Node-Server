//Importing required libraries
const profileRouter= require('express').Router();
var {isAuthorized} =require('../utils/Authorization')
const Profile=require('../models/Profile')
const validator= require('../utils/Validator');
const mongoose=require('mongoose');

// update profile route
profileRouter.post('/update',(req,res)=>{
    
    //Check Authorization from token header
    isAuthorized(req,async(response)=>{
        if(response.success)
        {
            //Validate information payload
           const {error}=validator.ProfileValidator(req.body)
           if(error)
                return res.status(406).send(
                        {
                            "success":false,
                            "msg":error.details[0].message
                        }
                    )
                    //Saving or Updating the Data Profiles
            const profile=prepareProfileObject(req.body).updateOne(prepareProfileObject(req.body),{upsert:true},(err,result)=>{
                        if(err)
                            return res.status(401).send(err);
                        return res.status(200).send({
                            success:true,
                            msg:"Profile Updated Successfuly"
                        });
                    });
           
        }
        else
            return res.status(401).send(response.msg)
        
    });
})
profileRouter.post('/genprofiles',(req,res)=>{
const {limit,district,state,latitudestart,longitudestart,cordinateStep}=req.body
var arr=[];
    for(var i=0;i<limit;i++)
    {
       
        const lat =latitudestart+(i/cordinateStep);
        const lon =longitudestart+(i/cordinateStep);
        arr.push({
            _id:district+"_"+state+"_"+i,
            name:"user_"+i,
            dob:1611764780000+(i*1000*60*60*24),
            bio:"Some amazing bio that can match with someone easily my lord",
            gender:i%2===0?"MALE":"FEMALE",
            interestedIn:i%2===0?"FEMALE":"MALE",
            jobTitle:"Sr. Engineer",
            school:"school",
            verified:false,
            nickName:"nick",
            displayPicture:"https://static.toiimg.com/photo/63264644.cms",
            portfolio:["https://static.toiimg.com/photo/63264644.cms","https://static.toiimg.com/photo/63264644.cms",
            "https://static.toiimg.com/photo/63264644.cms","https://static.toiimg.com/photo/63264644.cms","https://static.toiimg.com/photo/63264644.cms","https://static.toiimg.com/photo/63264644.cms","https://static.toiimg.com/photo/63264644.cms","https://static.toiimg.com/photo/63264644.cms","https://static.toiimg.com/photo/63264644.cms","https://static.toiimg.com/photo/63264644.cms","https://static.toiimg.com/photo/63264644.cms","https://static.toiimg.com/photo/63264644.cms","https://static.toiimg.com/photo/63264644.cms","https://static.toiimg.com/photo/63264644.cms"],
            interests:["interests1","interests1","interests1","interests1","interests1","interests1","interests1"],
            notifToken:"notifToken",
            deviceId:"deviceId",
            phone:"+916284887899",
            email:"user@gmail.com",
            district:district,
            state:state,
            latitude:lat.toString(),
            longitude:lon.toString(),
            authMethod:"FC",
            country:"India"
            
        });
        
    
    }
    mongoose.connection.collection('user_profiles').insertMany(arr,(err,result)=>{
            if(err)
             return res.send(err);
            return res.send("ACTIOn COMPLETE")
        })
   
})
profileRouter.post('/fetch',(req,res)=>{
    
    //Check Authorization from token header
    isAuthorized(req,async(response)=>{
        if(response.success)
        {
            const user=await Profile.findOne({_id:req.body._id})
            if(!user)
                return res.status(400).send({
                    success:false,
                    msg:"No Profile found"
                })
                
            return res.status(200).send(user)
        }
        else
        {
            return res.status(401).send(response.msg)
        }
    });
})
function prepareProfileObject(data)
{
    return new Profile({
        _id:data._id,
        name:data.name,
        dob:data.dob,
        bio:data.bio,
        gender:data.gender,
        interestedIn:data.interestedIn,
        jobTitle:data.jobTitle,
        company:data.company,
        school:data.school,
        verified:data.verified,
        nickName:data.nickName,
        displayPicture:data.displayPicture,
        portfolio:data.portfolio,
        interests:data.interests,
        notifToken:data.notifToken,
       deviceId:data.deviceId,
       phone:data.phone,
       email:data.email,
       district:data.district,
       state:data.state,
       latitude:data.latitude,
       longitude:data.longitude,
       authMethod:data.authMethod,
       country:data.country
    })
}
module.exports=profileRouter;
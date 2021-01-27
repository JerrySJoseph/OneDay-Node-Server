//Importing required libraries
const profileRouter= require('express').Router();
var {isAuthorized} =require('../utils/Authorization')
const Profile=require('../models/Profile')
const validator= require('../utils/Validator');


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
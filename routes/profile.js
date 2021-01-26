//Importing required libraries
const profileRouter= require('express').Router();
var {isAuthorized} =require('../utils/Authorization')
const { DisplayProfile }=require('../models/DisplayProfile');
const { DeviceProfile } = require('../models/DeviceProfile');
const { ContactProfile } = require('../models/ContactProfile');
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
                    const [displayProfile,deviceProfile,contactProfile]=await Promise.all([
                        prepareDisplayProfileObject(req.body).updateOne(prepareDisplayProfileObject(req.body),{upsert:true}),
                        prepareDeviceProfileObject(req.body).updateOne(prepareDeviceProfileObject(req.body),{upsert:true}),
                        prepareContactProfileObject(req.body).updateOne(prepareContactProfileObject(req.body),{upsert:true})
                    ])
           
            if(!displayProfile || !deviceProfile)
             return res.status(401).send("Error Writing to Database");           
                
            return res.status(200).send({
                     success:true,
                     msg:"Profile Updated Successfuly"
                 });
        }
        else
        {
            return res.status(401).send(response.msg)
        }
    });
})
profileRouter.post('/fetch',(req,res)=>{
    
    //Check Authorization from token header
    isAuthorized(req,async(response)=>{
        if(response.success)
        {
            if(!req.body.type)
                return res.status(400).send({
                    success:false,
                    msg:"Profile Type not defined in request"
                })
                var user;
            if(req.body.type=='request-type-displayprofile')
                user=await DisplayProfile.findOne({_id:req.body._id})
            else if(req.body.type=='request-type-contactprofile')
                user=await ContactProfile.findOne({_id:req.body._id})
            else if(req.body.type=='request-type-deviceprofile')
                user=await DeviceProfile.findOne({_id:req.body._id})
            else
                return res.status(400).send({
                    success:false,
                    msg:"No such request type exists"
                })
            return res.status(200).send(user)
        }
        else
        {
            return res.status(401).send(response.msg)
        }
    });
})
function prepareDisplayProfileObject(data)
{
    return new DisplayProfile({
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
        interests:data.interests
    })
}
function prepareDeviceProfileObject(data)
{
    return new DeviceProfile({
        _id:data._id,
       notifToken:data.notifToken,
       deviceId:data.deviceId
    })
}
function prepareContactProfileObject(data)
{
    return new ContactProfile({
        _id:data._id,
       phone:data.phone,
       email:data.email,
       district:data.district,
       state:data.state,
       latitude:data.latitude,
       longitude:data.longitude,
       verified:data.verified,
       authMethod:data.authMethod,
       country:data.country
    })
}
module.exports=profileRouter;
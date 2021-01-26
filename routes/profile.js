const profileRouter= require('express').Router();
var {isAuthorized} =require('../utils/Authorization')
const {DisplayProfile}=require('../models/DisplayProfile')

profileRouter.post('/update',(req,res)=>{
    isAuthorized(req,async(response)=>{
        if(response.success)
        {
            const displayProfilemodel=await prepareDisplayProfileObject(req.body).save()
        }
        else
        {
                
        }
    });
   /*
    const displayProfilemodel=await prepareDisplayProfileObject(req.body).save()
    *
    return res.send(displayProfilemodel)*/
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
module.exports=profileRouter;
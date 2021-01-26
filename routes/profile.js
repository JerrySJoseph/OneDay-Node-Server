const profileRouter= require('express').Router();
var {isAuthorized} =require('../utils/Authorization')
const {DisplayProfile}=require('../models/DisplayProfile')

profileRouter.post('/update',(req,res)=>{
    isAuthorized(req,async(response)=>{
        if(response.success)
        {
            prepareDisplayProfileObject(req.body).updateOne(prepareDisplayProfileObject(req.body),{upsert:true},(error)=>{
                if(error)
                 return res.status(401).send(error);
                 return res.status(200).send({
                     success:true,
                     msg:"Profile Updated Successfuly"
                 });
            })
            
        }
        else
        {
              return res.status(401).send(response.msg)  ;
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
const mongoose= require('mongoose');

const ContactProfileSchema=new mongoose.Schema({
     _id:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    district:{
        type:String,
        required:true,
    },
    state:{
        type:String,
        required:true
    },
    latitude:{
        type:String,
        required:true,
    },
    longitude:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true,
    },
    authMethod:{
        type:String,
        enum:["GOOGLE,FB,PHONE"],
        required:true
    },
})

module.exports.ContactProfile = mongoose.model('ContactProfile',ContactProfileSchema,'contact_profiles')
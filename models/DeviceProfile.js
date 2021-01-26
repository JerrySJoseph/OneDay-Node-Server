const mongoose= require('mongoose');

const DeviceProfileSchema=new mongoose.Schema({
     _id:{
        type:String,
        required:true,
    },
     notifToken:{
        type:String,
        required:true,
    },
    deviceId:{
        type:String,
        required:true
    },
})

module.exports.DeviceProfile = mongoose.model('DeviceProfile',DeviceProfileSchema,'device_profiles')
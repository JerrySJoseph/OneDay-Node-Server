var mongoose = require('mongoose');

var database;
const connectToDatabase=async(callback)=>{
    //Connecting to Database
    database =await mongoose.connect(process.env.DB_CONNECTION_STRING,
        {useNewUrlParser:true,useUnifiedTopology:true},
        (error)=>{
        return callback(error);
    })
}
const getDatabase=()=>{
    return database;
}

module.exports.connectToDatabase=connectToDatabase;
module.exports.getDatabase=getDatabase;
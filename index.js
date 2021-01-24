var express =require('express');
var admin= require('firebase-admin');
const bodyParser = require('body-parser');

var app=express();

var PORT=3000;

app.use(bodyParser.urlencoded({ extended: true }));
// Fetch the service account key JSON file contents
var serviceAccount = require("./oneday-5f5bb-firebase-adminsdk-jodwe-98767dc7ce.json");

// Initialize the app with a custom auth variable, limiting the server's access
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://oneday-5f5bb-default-rtdb.firebaseio.com/",

})

app.get('/',function(req,res){
    res.send("ONE DAY SERVER RUNNING ON PORT: "+PORT)
})
app.post('/profile',function(req,res){
    console.log(req.body)
    res.send(req.body)
})
var server = app.listen(PORT, function () {

    var port = server.address().port
    console.log("Server Running at PORT:"+PORT)
 })


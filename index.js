//Importing libraries
var express =require('express');
var admin= require('firebase-admin');
//Importing Router
const authRouter=require('./routes/auth')

//Initialising Express
var app=express();

//Assigning PORT
const PORT=3000|process.env.PORT;

//MiddleWares
app.use(express.json());
app.use('/api/auth',authRouter)

// Fetch the service account key JSON file contents
var serviceAccount = require("./oneday-5f5bb-firebase-adminsdk-jodwe-98767dc7ce.json");

// Initialize the app with a custom auth variable, limiting the server's access
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://oneday-5f5bb-default-rtdb.firebaseio.com/",

})

//Listening to Open PORT
app.listen(PORT,()=>console.log("One Day Server is Up and Running on localhost:"+PORT))


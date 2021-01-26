//Importing libraries
var express =require('express');
var mongoose = require('mongoose');
const dotenv=require('dotenv');


//Initialising Express
var app=express();

//Configuring dotenv for accessing Environment Variables
dotenv.config();

//Importing Router
const authRouter=require('./routes/auth')
const profileRouter=require('./routes/profile')

//Assigning PORT
const PORT=3000|process.env.PORT;

//BodyParser MiddleWare
app.use(express.json())

//Connecting to Database
mongoose.connect(process.env.DB_CONNECTION_STRING,
    {useNewUrlParser:true,useUnifiedTopology:true},
    (error)=>{
    if(error)
    console.log('Error connecting to Database :'+error.errmsg)
    else
    console.log("Connection Established to Database!")
})

//MiddleWares
app.use(express.json());
app.use('/api/auth',authRouter)
app.use('/api/profile',profileRouter)


//Listening to Open PORT
app.listen(PORT,()=>console.log("One Day Server is Up and Running on localhost:"+PORT))


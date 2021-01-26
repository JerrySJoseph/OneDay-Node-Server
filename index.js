//Importing libraries
var express =require('express');
var mongoose = require('mongoose');
const dotenv=require('dotenv');

//Configuring dotenv for accessing Environment Variables
dotenv.config();

mongoose.connect(process.env.DB_CONNECTION_STRING,
        {useNewUrlParser:true,useUnifiedTopology:true},
        (error)=>{
        if(error)
            console.log("Database Error:"+error)
        else
            console.log("Connection to database established")
    })

//Initialising Express
var app=express();

//Importing Router
const profileRouter=require('./routes/profile')

//Assigning PORT
const PORT=3000|process.env.PORT;

//BodyParser MiddleWare
app.use(express.json())

//MiddleWares
app.use(express.json());
app.use('/api/profile',profileRouter)


//Listening to Open PORT
app.listen(PORT,()=>console.log("One Day Server is Up and Running on localhost:"+PORT))


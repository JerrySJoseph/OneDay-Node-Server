const authRouter= require('express').Router();


authRouter.post('/register',(req,res)=>{
    res.send("Register")
})

authRouter.post('/login',(req,res)=>{
    res.send("Login")
})
module.exports=authRouter;
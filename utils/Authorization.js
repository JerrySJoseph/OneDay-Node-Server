const {FirebaseAdmin}=require('./FirebaseAdminInit');

function isAuthorized(req,response)
{
    const token=req.header('auth-token');
    if(!token)
        response({
            success:false,
            msg:"Access Denied"
        }); 
    else
    {
        FirebaseAdmin.auth().verifyIdToken(token)
            .then((decodedToken) => {
                
                response({
                        success:true,
                        msg:"User token Authorized",
                        uid:decodedToken.uid
                            });
                })
                .catch((error) => {
                    response( {
                        success:false,
                        msg:error.message
                            });
                });
                    
       
    }

}

module.exports.isAuthorized= isAuthorized
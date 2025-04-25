const { authClient } = require("../grpcClient/authClient");
const grpc= require("@grpc/grpc-js");



async function signUpUsers(req ,resp, next)
{
    try{
        const{ firstName,lastName, email, password, confirmPassword, dob, phoneNo,address}= req.body;
    authClient.signUpUsers({firstName,lastName, email, password, confirmPassword, dob, phoneNo,address},(error, response)=>
    {
        if(error)
        {
            console.log(error);
            return next(error);
        }
       return resp.status(201).json({message:"User Created Sucessfully"});
    })  
    }
    catch(err)
    {
        console.log(err);
        return next(err);
    }
      
}



module.exports= {signUpUsers}
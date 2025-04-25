const grpc= require("@grpc/grpc-js");
const { authClient } = require("../grpcClient/authClient");
const jwt= require("jsonwebtoken")

const signInUsers= async(req ,resp, next)=>
{
    const{email, password}= req.body;

    try{
        authClient.signInUsers({email, password}, (error, response)=>
            {
                if(error)
                {
                    console.log(error);
                    return next(error)
                }
                
                if(response.success)
                {
                    const id= response.id;
                    const accessToken= jwt.sign({id: id}, process.env.Remainder_System, {expiresIn:"1hr"}  )
        
                    return res
                    .cookie("token", accessToken, {
                      httpOnly: true,
                    })
                    .status(200)
                    .json({ ...response, token: accessToken });
                }
            })
    }
    catch(err)
    {
        console.log(err);
        return next(err);
    }
  

}

module.exports= {signInUsers}
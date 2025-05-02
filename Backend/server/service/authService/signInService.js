const grpc = require("@grpc/grpc-js");
const bcrypt= require("bcrypt")
const { checkFields } = require("../utils/checkForRequiredFields");
const { checkUserExists } = require("../utils/checkUserCredentials");


const signInUsers = async (call, callback) => {
  const { email, password } = call.request;

  const requiredFields = {
    email,
    password
  };

 

  //for checking of call.request is sending the data or not 
     await checkFields(requiredFields, callback);

    //check if user exist or not 
    const checkUser = await checkUserExists(email)

  

    if(!checkUser)
    {
        return callback({
            message:"Provided email with user doesnot exists",
            code: grpc.status.INVALID_ARGUMENT
        })
    }

    const storedPassword= checkUser.password;

    const comparePassword= await bcrypt.compare(password, storedPassword);

    if(!comparePassword)
    {
        return callback({
            details:"Provided password is incorrect",
            code: grpc.status.INVALID_ARGUMENT
        })
    }


    console.log(checkUser.id)
    return callback(null,{
        message:"User Logged In sucessfully",
        success: true,
        id:checkUser.id
    })


};

module.exports = { signInUsers };

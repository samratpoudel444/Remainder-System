const grpc = require("@grpc/grpc-js");
const sequelize = require("../../db/connection");
const{v4 : uuidv4}= require("uuid")
const bcrypt= require("bcrypt");
const { checkPassword, checkUserNotExist } = require("../utils/checkUserCredentials");
const { checkFields } = require("../utils/checkForRequiredFields");
const dotenv= require("dotenv").config();


const signUpUsers = async (call, callback) => {
  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    dob,
    phoneNo,
    address
  } = call.request;

  const requiredFields = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    confirmPassword:confirmPassword,
    dob: dob,
    phoneNo: phoneNo,
    address: address
  };

  //checking if call.request is sending the data or not
  checkFields(requiredFields, callback);


  //checking if password and confirm password are same 
  const equalPasswordConfirmation= await checkPassword(password, confirmPassword);

  if(equalPasswordConfirmation == false)
  {
    console.log("Passwords do not match");
    return callback({
      code: grpc.status.INVALID_ARGUMENT,
      details: "Password and Confirm Password must match"
    });
  }

  //check if user exist or not
  checkUser= await checkUserNotExist(email)

  if(checkUser)
  {
    return callback({
        code: grpc.status.ALREADY_EXISTS,
        details: "Provided email with user already exists"
      });
  }

  const SALT_ROUND= parseInt(process.env.SALT_ROUND);
  const hashedPassword= await bcrypt.hash(password, SALT_ROUND);

  const id= uuidv4();
  const query= `insert into users(id, firstName, lastName, email, Password, DOB, PhoneNo, Address) values (:id, :firstName, :lastName, :email, :hashedPassword, :dob, :phoneNo, :address)`
  const [dataInsert, _]= await sequelize.query(query,
    {
        replacements:{
            id,
            firstName,
            lastName,
            email,
            hashedPassword,
            dob,
            phoneNo,
            address
        }
    }
    
  )

  return callback(null, {
    message: "User created successfully"
  });

};



module.exports= {signUpUsers}
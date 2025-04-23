const grpc= require("@grpc/grpc-js");
const sequelize = require("../../db/connection");
const{v4 : uuidv4}= require("uuid")




const setRemainder= async(call, callback)=>
{
    const{remainderName, remainderType, remainderDate, message}= call.request;
    const id= uuidv4();
    const userId= "272e57fe-657d-4719-8e6c-3be72bd09d23";
    try{

        if(!remainderName || !remainderType || !remainderDate || !message)
        {
            return callback({
                code:grpc.status.NOT_FOUND,
                details:"please provide the required fields"
            })
        }

        const query= `INSERT INTO remainderTables (id, remainderName, remainderType, remainderDate, message, userId ) values (:id, :remainderName, :remainderType, :remainderDate, :message, :userId)`;

        const [insertIntoTable, __]= await sequelize.query(query,
            {
                raw:true,
                replacements:{
                    id, remainderName, remainderType, remainderDate, message, userId 
                }
            }
        )

        if(!insertIntoTable)
        {
            return callback(null, {
                message:`Remainder for ${remainderType} set on ${remainderDate}`
            })
        }


        return callback({
            details: "failed to set remainder",
            code: grpc.status.UNIMPLEMENTED
        })        

    }
    catch(err)
    {
        console.log(err);
        return callback({
            details: "Internal server error",
            code: grpc.status.INTERNAL
        })  
    }
}



module.exports= {setRemainder}


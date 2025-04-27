const { Metadata } = require("@grpc/grpc-js");
const { remainderClient } = require("../grpcClient/remainderSettingClient");

const setRemainder= async(req, resp, next)=>
{
    try{
        const{remainderName, remainderType, remainderDate, message}= req.body;
        const metadata= new Metadata();
        metadata.add('userId', req.user.id);

        remainderClient.setRemainder({remainderName, remainderType, remainderDate, message}, metadata, (error, response)=>
        {
            if(error)
            {
                console.log(error);
                return next(error)
            }

            if(response)
            {
                return resp.status(201).json({message: response});
            }
        })
    }
    catch(err)
    {
        console.log(err);
    }
}



module.exports= {setRemainder}
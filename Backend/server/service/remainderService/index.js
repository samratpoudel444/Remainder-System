const grpc= require("@grpc/grpc-js")
const protoLoader= require("@grpc/proto-loader");
const { remainderProtoPath, remainderUrl, Options } = require("../../db/config/protoConfig");
const { setRemainder } = require("./collectRemainder");


const packageDefination= protoLoader.loadSync(remainderProtoPath, Options);
const remainderPackage= grpc.loadPackageDefinition(packageDefination).remainder;

const server= new grpc.Server();


server.addService(remainderPackage.remainderService.service,
    {
        setRemainder
    }
)



function remainderService()
{

    server.bindAsync(remainderUrl, grpc.ServerCredentials.createInsecure(), ()=>
    {
        console.log(`server started on url: ${remainderUrl}`)
    } )
}


module.exports= {remainderService}



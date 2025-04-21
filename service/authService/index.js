const grpc= require("@grpc/grpc-js");
const protoLoader= require("@grpc/proto-loader");
const { authProtoPath, Options, authUrl } = require("../../db/config/protoConfig");

const packageDefination= protoLoader.loadSync(authProtoPath, Options);

const authPackage = grpc.loadPackageDefinition(packageDefination).authPackage;

const server = new grpc.Server();


function authServer()
{
    server.bindAsync(authUrl, grpc.ServerCredentials.createInsecure(), ()=>
        {
            console.log("auth server started on port: ", authUrl);
        })
}


module.exports= {authServer}

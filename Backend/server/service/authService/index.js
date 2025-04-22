const grpc= require("@grpc/grpc-js");
const protoLoader= require("@grpc/proto-loader");
const { authProtoPath, Options, authUrl } = require("../../db/config/protoConfig");
const { signUpUsers } = require("./signUpService");
const { signInUsers } = require("./signInService");



const packageDefination= protoLoader.loadSync(authProtoPath, Options);

const authPackage = grpc.loadPackageDefinition(packageDefination).auth;

 const server = new grpc.Server();

server.addService(authPackage.AuthService.service, {
    signUpUsers,
    signInUsers
});


function authServer()
{
    server.bindAsync(authUrl, grpc.ServerCredentials.createInsecure(), ()=>
        {
            console.log("auth server started on port: ", authUrl);
            
        })
}


module.exports= {authServer}

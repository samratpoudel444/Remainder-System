const grpc= require('@grpc/grpc-js');
const protoLoader= require('@grpc/proto-loader')
const path= require("path");


const authPath= path.resolve(__dirname, "../../proto/auth.proto");


const packageDefinations= protoLoader.loadSync(authPath,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
    }
)

const authProto= grpc.loadPackageDefinition(packageDefinations);
const userAuth = authProto.auth.AuthService;

const authClient= new userAuth(
   "localhost:50053",
    grpc.credentials.createInsecure()
  );

module.exports= {authClient}
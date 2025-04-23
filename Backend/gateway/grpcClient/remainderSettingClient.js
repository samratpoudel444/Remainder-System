const grpc= require("@grpc/grpc-js");
const protoLoader= require("@grpc/proto-loader");
const path= require('path');

const remainderPath= path.resolve(__dirname, "../../proto/remainder.proto" );

const packageDefination= protoLoader.loadSync(remainderPath,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
    }
)
const remainderProto= grpc.loadPackageDefinition(packageDefination);
const remainder= remainderProto.remainder.remainderService


const remainderClient= new remainder(
    "localhost:50053",
    grpc.credentials.createInsecure(),
)

module.exports= {remainderClient}
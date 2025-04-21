const authProtoPath= "../proto/auth.proto" 
const Options= {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
}
const authUrl= "localhost:50051"



module.exports={authProtoPath, Options, authUrl}
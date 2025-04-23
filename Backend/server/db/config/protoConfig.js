const authProtoPath= "../proto/auth.proto" 
const Options= {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
}
const authUrl= "localhost:50052"
const remainderUrl= "localhost:50053"

const remainderProtoPath= "../proto/remainder.proto"


module.exports={authProtoPath, Options, authUrl, remainderProtoPath, remainderUrl}
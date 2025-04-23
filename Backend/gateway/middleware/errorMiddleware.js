const grpc = require("@grpc/grpc-js");

const errorHandler = async (err, req, res, next) => {
    if (err.code < 16) {
        switch (err.code) {
            case grpc.status.CANCELLED:
                return res.status(499).json({ msg: err.details || err.message }); 
            case grpc.status.INVALID_ARGUMENT:
                return res.status(400).json({ msg: err.details || err.message });
            case grpc.status.UNKNOWN:
                return res.status(500).json({ msg: err.details || err.message });
            case grpc.status.DEADLINE_EXCEEDED:
                return res.status(504).json({ msg: err.details || err.message });
            case grpc.status.NOT_FOUND:
                return res.status(404).json({ msg: err.details || err.message });
            case grpc.status.ALREADY_EXISTS:
                return res.status(409).json({ msg: err.details || err.message }); 
            case grpc.status.PERMISSION_DENIED:
                return res.status(403).json({ msg: err.details || err.message });
            case grpc.status.RESOURCE_EXHAUSTED:
                return res.status(429).json({ msg: err.details || err.message });
            case grpc.status.FAILED_PRECONDITION:
                return res.status(400).json({ msg: err.details || err.message });
            case grpc.status.ABORTED:
                return res.status(409).json({ msg: err.details || err.message });
            case grpc.status.OUT_OF_RANGE:
                return res.status(400).json({ msg: err.details || err.message });
            case grpc.status.UNIMPLEMENTED:
                return res.status(501).json({ msg: err.details || err.message });
            case grpc.status.INTERNAL:
                return res.status(500).json({ msg: err.details || err.message });
            case grpc.status.UNAVAILABLE:
                return res.status(503).json({ msg: err.details || err.message });
            default:
                return res.status(500).json({ msg: err.details || err.message });
        }
    }
    else{
        const status= err.status;
        const message= err.message;
        const details= err.details;

        return res.status(status).json({message: message || details})

    }
};


module.exports= {errorHandler}

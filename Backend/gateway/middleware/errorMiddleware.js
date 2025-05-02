const grpc = require("@grpc/grpc-js");

const errorHandler = async (err, req, res, next) => {
    console.error("gRPC Error:", err.details);

    if (typeof err.code === "number" && err.code < 16) {
        switch (err.code) {
            case grpc.status.CANCELLED:
                return res.status(499).json({ message:  err.details|| err.message });
            case grpc.status.INVALID_ARGUMENT:return res.status(400)
                  .json({ message: err.details || err.message });
            case grpc.status.UNKNOWN:
                return res
                  .status(500)
                  .json({ message: err.details || err.message });
            case grpc.status.DEADLINE_EXCEEDED:
                return res
                  .status(504)
                  .json({ message: err.details || err.message });
            case grpc.status.NOT_FOUND:
                return res
                  .status(404)
                  .json({ message: err.details || err.message });
            case grpc.status.ALREADY_EXISTS:
                return res
                  .status(409)
                  .json({ message: err.details || err.message });
            case grpc.status.PERMISSION_DENIED:
                return res
                  .status(403)
                  .json({ message: err.details || err.message });
            case grpc.status.RESOURCE_EXHAUSTED:
                return res
                  .status(429)
                  .json({ message: err.details || err.message });
            case grpc.status.FAILED_PRECONDITION:
                return res
                  .status(400)
                  .json({ message: err.details || err.message });
            case grpc.status.ABORTED:
                return res
                  .status(409)
                  .json({ message: err.details || err.message });
            case grpc.status.OUT_OF_RANGE:
                return res
                  .status(400)
                  .json({ message: err.details || err.message });
            case grpc.status.UNIMPLEMENTED:
                return res
                  .status(501)
                  .json({ message: err.details || err.message });
            case grpc.status.INTERNAL:
                return res
                  .status(500)
                  .json({ message: err.details || err.message });
            case grpc.status.UNAVAILABLE:
                return res
                  .status(503)
                  .json({ message: err.details || err.message });
            default:
                return res
                  .status(500)
                  .json({ message: err.details || err.message });
        }
    } else if (err.code) {
        return res.status(err.status || 500).json({
            message: err.message || err.details
        });
    } else {
        console.error("Unexpected error structure:", err);
        return res.status(500).json({ message: "An unexpected error occurred." });
    }
};

module.exports = { errorHandler };

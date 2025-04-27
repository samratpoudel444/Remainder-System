const grpc = require("@grpc/grpc-js");

const errorHandler = async (err, req, res, next) => {
    console.error("gRPC Error:", err);

    if (typeof err.code === "number" && err.code < 16) {
        switch (err.code) {
            case grpc.status.CANCELLED:
                return res.status(499).json({ code: 499, message: err.message || err.details });
            case grpc.status.INVALID_ARGUMENT:
                return res.status(400).json({ code: 400, message: err.message|| err.details  });
            case grpc.status.UNKNOWN:
                return res.status(500).json({ code: 500, message: err.message || err.details });
            case grpc.status.DEADLINE_EXCEEDED:
                return res.status(504).json({ code: 504, message: err.message || err.details });
            case grpc.status.NOT_FOUND:
                return res.status(404).json({ code: 404, message: err.message || err.details });
            case grpc.status.ALREADY_EXISTS:
                return res.status(409).json({ code: 409, message: err.message || err.details });
            case grpc.status.PERMISSION_DENIED:
                return res.status(403).json({ code: 403, message: err.message || err.details });
            case grpc.status.RESOURCE_EXHAUSTED:
                return res.status(429).json({ code: 429, message: err.message || err.details });
            case grpc.status.FAILED_PRECONDITION:
                return res.status(400).json({ code: 400, message: err.message || err.details });
            case grpc.status.ABORTED:
                return res.status(409).json({ code: 409, message:  err.message || err.details });
            case grpc.status.OUT_OF_RANGE:
                return res.status(400).json({ code: 400, message: err.message || err.details  });
            case grpc.status.UNIMPLEMENTED:
                return res.status(501).json({ code: 501, message: err.message || err.details });
            case grpc.status.INTERNAL:
                return res.status(500).json({ code: 500, message: err.message || err.details });
            case grpc.status.UNAVAILABLE:
                return res.status(503).json({ code: 503, message:  err.message || err.details  });
            default:
                return res.status(500).json({ code: 500, message: err.message || err.details });
        }
    } else if (err.code) {
        return res.status(err.status || 500).json({
            code: err.status || 500,
            message: err.message || err.details
        });
    } else {
        console.error("Unexpected error structure:", err);
        return res.status(500).json({ code: 500, message: "An unexpected error occurred." });
    }
};

module.exports = { errorHandler };

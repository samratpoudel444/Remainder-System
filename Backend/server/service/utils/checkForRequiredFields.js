const grpc = require("@grpc/grpc-js");

const checkFields = (requiredFields, callback) => {
  for (const [key, value] of Object.entries(requiredFields)) {
    if (!value) {
      console.log("Missing:", key);
      callback({
        code: grpc.status.INVALID_ARGUMENT,
        details: `Please provide ${key}`,
      });
      return false;
    }
  }
  return true;
};

module.exports = { checkFields };

const jwt = require("jsonwebtoken");
const authMiddleware = async (req, resp, next) => {
  try {
    if (!req.headers.authorization) {
      return next({
        code: 401,
        message: "Token Not found",
        extraDetails: "Unauthenticiated",
      });
    }

    const [_, token] = req.headers.authorization.split(" ");

    if (!token) {
      return next({
        code: 401,
        message: "Token Not Found",
        extraDetails: "Unauthenticated",
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
      if (err) {
        if (err instanceof jwt.JsonWebTokenError) {
          console.log(err);
          return next({ code: 401, extraDetails: err.message });
        }
      }
      req.user = data;
      next();
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = { authMiddleware };

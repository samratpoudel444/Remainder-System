const jwt = require('jsonwebtoken');

 const authenticateSocket= ((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
       console.log("Token missing");
    }

    try {

      const user = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = user.id;
      next();
    } catch (err) {
      console.error("Invalid token");
    }
  });


  module.exports= {authenticateSocket}
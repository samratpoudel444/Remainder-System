const {
  authenticateSocket,
} = require("../../../../gateway/middleware/socketIo");
const client = require("../../../db/config/redisClient");
// const { io } = require("./socketInitialize");


const userConnection= async(io)=>
{
  //here socket.user is userId coming from the middleware i.e. authenticateSocket
  io.use(authenticateSocket);

  io.on("connection", async (socket) => {
    await client.set(`${socket.user}`, socket.id);

    console.log(`User connected with socket id: ${socket.id}`);

    socket.emit("notifications", { message: "hello kka xa" });

    socket.on("disconnect", async () => {
      await client.del(socket.user);
      console.log(`User ${socket.user?.id || "Unknown"} disconnected`);
    });
  });
}

module.exports= {userConnection};


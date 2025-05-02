const { authenticateSocket } = require("../../../../gateway/middleware/socketIo");
const client = require("../../../db/config/redisClient");
const { io } = require("./socketInitialize");





const sendNotification= async(data)=>
{

    if(data.userId)
    {
        const id= data.userId
        const socketId= await client.get(id);
        if(socketId)
        {
            io.to(socketId).emit("remainder", {
              remainderType: "MedicationReminders",
              message: "Visit Dr. Sharma at 3 PM for a regular checkup.",
            });
        }

    }
    return;
}


module.exports= {sendNotification}
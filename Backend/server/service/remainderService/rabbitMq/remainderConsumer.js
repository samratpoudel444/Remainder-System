const amqp= require("amqplib");
const { mailService } = require("../../utils/mail");
const { sendNotification } = require("../../utils/socketIo/sendNotifications");

const remainderMessageConsume= async()=>
{
    const connection = await amqp.connect("amqp://localhost");
    const channel= await connection.createChannel();

    await channel.assertQueue("remainderQueue", {durable:true, arguments: { "x-queue-mode": "lazy"},});

    await channel.consume("remainderQueue", async(msg)=>
    {
           if(msg)
           {
            const data = JSON.parse(msg.content.toString());
            console.log("hello", data);
        

      if (Array.isArray(data)) {
        for (const item of data) {
          sendNotification(data)

        }
      } else {
         sendNotification(data);
        //await mailService(data); 
      
      }

      channel.ack(msg);
      console.log("message acknowledged")
           }
        })
       
    
}

remainderMessageConsume()
module.exports={remainderMessageConsume}
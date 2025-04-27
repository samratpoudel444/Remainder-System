const amqp= require("amqplib");
const { mailService } = require("../../utils/mail");


const messageConsume= async()=>
{
    const connection = await amqp.connect("amqp://localhost");
    const channel= await connection.createChannel();

    await channel.assertQueue("remainderQueue", {durable:true, arguments: { "x-queue-mode": "lazy"},});

    await channel.consume("remainderQueue", async(msg)=>
    {
           if(msg)
           {
            const data = JSON.parse(msg.content.toString());


      if (Array.isArray(data)) {
        for (const item of data) {
          console.log(item); 
          await mailService(item); 
        }
      } else {
        
        console.log(data);
        await mailService(data); 
      }

      channel.ack(msg)
           }
        })
       
    
}

messageConsume();
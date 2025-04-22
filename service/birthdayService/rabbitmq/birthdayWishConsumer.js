const amqp= require("amqplib");
const { transporter, sendMail } = require("../utils/NodemailerConfig");


const consumeMessage = async()=>
{
    const connection= await amqp.connect(`amqp://localhost`);
    const channel =await connection.createChannel();


    await channel.assertQueue("birthday_notifications", {durable:true,
        arguments: { "x-queue-mode": "lazy" }
       })

    await channel.consume("birthday_notifications", async(msg)=>
    {
        if(msg)
        {
            const data= msg.content.toString();
       
            for(i= 0; i<data.length; i++)
            {
                sendMail(data)
            }
        }
       

    })
}


consumeMessage();


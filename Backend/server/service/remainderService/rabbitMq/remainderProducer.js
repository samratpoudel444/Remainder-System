const amqp = require("amqplib");
const { getAllRemainder } = require("../../utils/getAllRemainder");
const cron= require('node-cron');

cron.schedule('30 * * * * *', async()=>
{
    const data= await getAllRemainder();
    if(data)
    {

        messageProduce(data);
    }
    else
    {
        console.log("no data avilable for now");
    }
})


const messageProduce= async(data)=>
{
     const connection= await amqp.connect("amqp://localhost");
     const channel= await connection.createChannel();
     
     await channel.assertQueue("remainderQueue", {durable:true, arguments:{"x-queue-mode": "lazy"}});

     for(i=0 ; i<data.length; i++)
     {
         channel.sendToQueue("remainderQueue", Buffer.from(JSON.stringify(data[i])), {persistent:true})
     }

     await channel.close();
     await connection.close();
}
const amqp= require('amqplib');
const cron= require('node-cron');
const grpc= require('@grpc/grpc-js');
const { birthdaywish } = require('../utils/checkBrithdates');
const { assert } = require('console');



cron.schedule('5 * * * * *', async()=>
{
    console.log("task will run at 7 am every day ");
    const data= await birthdaywish()
    if(data)
    {
        messageProduce(data)
    }
})


const messageProduce= async(data)=>
{
    const connection= await amqp.connect("amqp://localhost");
    const channel= await connection.createChannel();

    await channel.assertQueue("birthday_notifications", {durable: true, arguments:{"x-queue-mode": "lazy"}});

    for(i=0; i<data.length; i++)
    {
        await channel.sendToQueue("birthday_notifications", Buffer.from(JSON.stringify(data[i])),{persistent:true})
        console.log("mesasge is send")
    }
    
    await channel.close();
    await connection.close();
}


module.exports= {cron}
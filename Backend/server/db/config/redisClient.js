const redis = require("redis");
const client = redis.createClient(
    {
        url:"redis://localhost:6379"
    }
);

client.on("error", err=> console.error("redis error"));
client.connect();




module.exports= client;


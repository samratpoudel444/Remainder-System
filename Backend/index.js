const cookieParser = require("cookie-parser");
const express = require("express");
const authRouter = require("./gateway/routes/authRoute");
const { errorHandler } = require("./gateway/middleware/errorMiddleware");
const { authMiddleware } = require("./gateway/middleware/authMiddleware");
const  remainderRouter  = require("./gateway/routes/remainderRoute");
const { cron } = require("./server/service/birthdayService/rabbitmq/birthdayWishProducer");
const { consumeMessage } = require("./server/service/birthdayService/rabbitmq/birthdayWishConsumer");


const dotenv = require("dotenv").config();


const app = express();
const port = process.env.PORT || 8000;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

 consumeMessage()

app.use("/api/users", authRouter);
app.use("/api/users", remainderRouter);



app.use(errorHandler);




app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

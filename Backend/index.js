const cookieParser = require("cookie-parser");
const express = require("express");
const authRouter = require("./gateway/routes/authRoute");
const dotenv = require("dotenv").config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", authRouter);

app.get("/", (req, res) => {
  res.send("Server is running");
});


app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

const { setRemainder } = require("../controller/remainderAdding");
const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const remainderRouter = express();

remainderRouter.route("/setRemainder").post(authMiddleware, setRemainder);

module.exports = remainderRouter;

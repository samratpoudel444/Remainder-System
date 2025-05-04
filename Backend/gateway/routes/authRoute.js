const express = require("express");
const { signInUsers } = require("../controller/signInUsers");
const { signUpUsers } = require("../controller/signUpUsers");
const router = express.Router();

router.post("/signUpUsers", signUpUsers);
router.post("/signInUsers", signInUsers);

module.exports = router;

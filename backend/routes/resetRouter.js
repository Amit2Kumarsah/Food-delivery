const express = require("express");
const {sendEmail, veriefyOtp, reset} = require("../controllers/resetController");

const resetRouter = express.Router();

resetRouter.post("/sendEmail", sendEmail);
resetRouter.post("/otp", veriefyOtp);
resetRouter.post("/reset", reset);

module.exports = resetRouter;
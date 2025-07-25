const express = require('express');
const {loginUser, registerUser} = require('../controllers/userController.js');
const multer = require('multer');
const upload = multer();

const userRouter = express.Router();

userRouter.post("/register",upload.none(), registerUser);
userRouter.post('/login', upload.none(), loginUser);

module.exports = userRouter;
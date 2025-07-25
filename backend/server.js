const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const  connectDB  = require('./config/db.js');
const  foodRouter  = require('./routes/foodRoute.js');
const userRouter = require('./routes/userRoute.js');
const cartRouter = require('./routes/cartRoute.js');
const orderRouter = require("./routes/orderRoute.js");
const resetRouter = require('./routes/resetRouter.js');


// npm install bcrypt jsonwebtoken multer stripe validator nodemon read what which do


// app config 
const app = express();
// middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

connectDB();

const port =process.env.PORT ||4000;

// api endpoints
app.use('/images', express.static('uploads')); // Serve static files from 'uploads' directory
app.use('/api/food', foodRouter);
app.use('/api/user', userRouter);
app.use("/api/cart/", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/forget", resetRouter);

 
app.listen(port, ()=>{
    console.log('Server is running on port ',port || 5000)
})

app.get('/', (req, res) =>{
    res.send('Welcome to the backend server!');
})

// mongodb+srv://Amitkumar:<db_password>@cluster0.ap09v.mongodb.net/?


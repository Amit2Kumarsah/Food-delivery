const mongoose = require('mongoose');

const connectDB = async () =>{
    try{
        await mongoose.connect('mongodb+srv://Amitkumar:Amit2004kumar@cluster0.devkajh.mongodb.net/food-del');
        // await mongoose.connect('mongodb://127.0.0.1:27017/food-del');
        console.log('MongoDB connected successfully');
    }catch(err){
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit process with failure
    }
}

module.exports = connectDB;
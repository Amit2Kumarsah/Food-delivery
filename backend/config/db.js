const mongoose = require('mongoose');

const connectDB = async () =>{
    try{
        await mongoose.connect(`mongodb+srv://Amitkumar:${process.env.KEY}@cluster0.devkajh.mongodb.net/food-del`);
        console.log('MongoDB connected successfully');
    }catch(err){
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit process with failure
    }
}

module.exports = connectDB;
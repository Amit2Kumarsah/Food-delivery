const user = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const validator = require('validator');

// login user

const loginUser = async (req, res) =>{
    try{
        const email = req.body.email;
        const password = req.body.password;
        const userFound = await user.findOne({email:email});
        if(!userFound){
            return res.json({success:false,message:"user doesn't exist"});
        }

        const isMatch = await bcrypt.compare(password, userFound.password)
        if(!isMatch){
            return res.json({sucess:false, message:"Invalid password"});
        }
        const token = createToken(userFound._id);
        res.send({success:true,token});
    }catch(err){
        res.send({success:false, message:"Login fails"});
    }
}


const createToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET);
}



// register user
const registerUser = async (req, res) =>{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    
    // bcrypt password with salt
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    try{

        // checking is user already exists.
        const userExist = await user.findOne({email:email});
        if(userExist){
            return res.json({success:false,message: "User Already exist"});
        }

        // validating email format & strong password
        if(password.length <8){
            return res.json({success:false, message: "pleas enter strong passowrd"})
        }


        // creating new user
        const users = new user({
            name:name,
            email:email,
            password: hashedPassword,
        })
        const saveuser = await users.save();
        const token = createToken(saveuser._id);
        res.json({success:true,token});

    }catch(err){
        res.json({success:false, message:"user account not created"});
        console.log(err);
    }
}

module.exports = {registerUser, loginUser};
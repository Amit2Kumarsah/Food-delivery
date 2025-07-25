const user = require("../models/userModel");
const nodemailer = require("nodemailer")
const bcrypt = require("bcrypt");
// const dotenv = require('dotenv');
// dotenv.config();


// sending otp on email

let otpStorage = {};
let otpgeneratotTime;
const otpExpiryTime = 5 * 60 *1000; // 5 minutes in milliseconds
let otp;
const sendEmail = ( async(req, res) =>{
    const {email} = req.body;

    try{
        const userExist = await user.findOne({email:email});

        if(!userExist){
            return res.json({success:false, message:"user not exist"});
        }

        otp = Math.floor(100000 + Math.random() * 900000).toString();
        otpStorage[email] = otp;
        otpgeneratotTime = Date.now();

        const transpoter = nodemailer.createTransport({
            service: "Gmail",
            auth:{
                user: "sah771382@gmail.com",
                pass: `${process.env.GMAIL_PASS}`,
            }
        })

        // mail options

        const mailOptions = {
            from: "sah771382@gmail.com",
            to: email,
            subject: "Your OTP",
            text: `Your OTP is ${otp} expire in 5 minute`
        }

        // sending email
        transpoter.sendMail(mailOptions, (error, info) =>{
            if (error) {
                return res.status(500).send(error.toString());
            }
            res.json({success:true, message:"OTP send successfully"});
        });


    }catch(err){
        res.json({success:false, message:"Error in sending OTP"})
    }
}) 


// veriefy otp
const veriefyOtp = ( async(req, res) =>{
    const {email, otp} = req.body;
    const currentTime = Date.now();

    if(currentTime - otpgeneratotTime > otpExpiryTime){
        return res.json({success:false, message:"OTP expired"})
    }

    if(otpStorage[email] === otp){
        delete otpStorage[email];
        res.json({success:true, message:"OTP verified"});
    }else{
        res.json({success:false, message:"Invalid OTP"});
    }

})


// reset password
const reset = ( async (req, res) =>{
    const {email,newPassword} = req.body;

    if(!newPassword){
        return res.json({success:false, message:"Enter password"});
    }

    try{
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const resetUser = await user.findOneAndUpdate(
            {email:email}, 
            {$set:{password:hashedPassword}},
            {new:true}
        );
        
        if(!resetUser){
            return res.json({success:false, message:"password is not reset"});
        }
        res.json({success:true, message:"password is reset successfull"});
    }catch(err){
        console.log("Error is :", err);
        res.json({success:false, message:"Error occurs"});
    }
})

module.exports = {sendEmail, veriefyOtp, reset};
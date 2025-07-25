const user = require("../models/userModel");


// add items to user cart

const addToCart = async (req,res) =>{
    try{
        const userData = await user.findById({_id:req.body.userId});
        const cartData = await userData.cartData;

        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1;
        }else{
            cartData[req.body.itemId] +=1;
        }

        await user.findByIdAndUpdate(req.body.userId,{cartData});

        res.json({success:true, message:"Added to Cart"});
    }catch(err){
        console.log(err);
        res.json({success:false, message:"Error"});
    }
}

//vremove items from user cart
const removeFromCart = async (req, res) =>{
    try{
        const userData = await user.findById(req.body.userId);
        const cartData = await userData.cartData;

        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId] -= 1;
        }

        await user.findByIdAndUpdate(req.body.userId, {cartData});

        res.json({success:true, message:"Removed From Cart"})
    }catch(err){
        console.log(err);
        res.json({success:false, message:"Error"});
    }
}

// fetch user cart data
const getCart = async (req, res) =>{
    try{
        const userData = await user.findById(req.body.userId);
        const cartData = await userData.cartData;
        
        res.json({success:true, cartData});
    }catch(err){
        console.log(err);
        res.json({success:false,message:"Errror"});
    }
}

module.exports = {addToCart, removeFromCart, getCart}
const orderModel = require("../models/orderModel");
const user = require("../models/userModel");

// placing user order for fronted


const placeOrder = async (req, res) =>{

    const fronted_url = "http:localhost:5173";
    
    try{
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        })

        await newOrder.save();

        await user.findByIdAndUpdate(req.body.userId, {cartData:{}});

        
        res.json({success:true, message:"Order placing is success"});
    }catch(err){
        console.log("Error is : ",err);
        res.json({success:false, message:"Error"})
    }
}




// user orders fro fronted
const userOrders = async (req, res) =>{
    
    try{
        const orders = await orderModel.find( {userId: req.body.userId});
        res.json({success: true, data: orders});
    }catch( err){
        console.log("Error is : ", err);
        res.json({success: false, message: "Error in fetching orders"});
    }
}

// Listing all orders fo admin panel

const listOrders = async (req, res) => {
    
    try{
        const allOrders = await orderModel.find({});
        res.json({success: true, data: allOrders});
        
    }catch(err) {
        console.log("Error is : ", err);
        res.json({success: false, message: "Error"});
    }
}

// api for updating order status
const  updateStatus = async (req, res) =>{
    try{
        await orderModel.findByIdAndUpdate(req.body.orderId, {status:req.body.status});
        res.json({success: true, message: "Status updated"});
    }catch(err){
        console.log("Error is : ", err);
        res.json({success: false, message: "Error in updating status"});
    }
}

module.exports = {placeOrder, userOrders, listOrders, updateStatus};
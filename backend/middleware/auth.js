const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) =>{
    const token = req.headers;
    if(!token){
        return res.json({success:false, message:"Not authorized Login Again"});
    }

    try{
        const token_decode = jwt.verify(token.token,process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next();
    }catch(err){
        console.log(err);
        res.json({success:false, message:"Error"});
    }
}

module.exports = authMiddleware;
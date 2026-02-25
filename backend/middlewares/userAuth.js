const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.userAuth = async(req,res,next)=>{
    try{
        const{token} = req.cookies;
        if(!token){
           return  res.status(401).json({
                message:"token not found",
                status:false
            })
        }
        const decode = jwt.verify(token,process.env.JWT_SECRET_KEY);
        console.log("decode------->",decode);

        const user = await User.findById(decode.userId);

    if (!user) {
      return res.status(401).json({
        message: "User not found",
        status: false,
      });
    }
        
        req.user = user;
        req.userId = decode.userId;
        req.userRole = decode.userRole;
        next()

    }catch(error){
        res.status(500).json({
            message:error.message,
            status:false
        })
        
    }
}

exports.authorize=(requiredRole)=>{
    return(req,res,next)=>{
        const {userRole} = req;
        if(!requiredRole.includes(userRole))
           return res.status(403).json({
        message:"forbiddon",
        status:false
    });
    next();

    }


}


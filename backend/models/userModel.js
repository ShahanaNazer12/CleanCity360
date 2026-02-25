const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Area = require("./areaModel");
const userSchema = new mongoose.Schema({
    fullName :{
        type:String,
        required:[true,"pls enter your name"],
        minLength:[2,"name should be atleast two character"]

    },
    email:{
        type:String,
        required:[true,"pls enter your email address"],
        unique:[true,"this email is already exist"]
    },
    password:{
        type:String,
        required:[true,"pls enetr password"]
    },
    // mobileNumber:{
    //     type:Number,
    //     required:[true,"pls enter your mobile number"]
    // },
    status:{
        type:Boolean,
        default:true
    },
    role:{
        type:String,
        enum:["admin","user","worker"],
        default:"user"
    },
    assignedArea: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "area",
}

    

},
{timestamps:true}
);
userSchema.pre('save', async function () {
    if (!this.isModified('password')) return ;
    this.password = await bcrypt.hash(this.password, 10);
    
});

const User = mongoose.model("user",userSchema);
module.exports = User
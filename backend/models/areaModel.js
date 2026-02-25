const mongoose = require("mongoose");

const areaSchema = new mongoose.Schema({
    areaName:{
        type:String,
        required:[true,"pls add area"],
        unique:[true,"this area is already exist"]

    },
    

},
{timestamps:true}
);
const Area = mongoose.model('area',areaSchema);
module.exports = Area;
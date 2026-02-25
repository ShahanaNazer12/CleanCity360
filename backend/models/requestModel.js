const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  area: { type: mongoose.Schema.Types.ObjectId, ref: "area" },
  description:{
    type:String,
    required:[true,"pls add a description"]

  },
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
  assignedWorker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

const Request = mongoose.model('request',requestSchema);
module.exports = Request

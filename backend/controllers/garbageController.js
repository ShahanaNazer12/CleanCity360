const Area = require("../models/areaModel");
const Request = require("../models/requestModel");
const User = require("../models/userModel");


exports.requestPickup = async(req,res)=>{
    try{
        const{area,description} = req.body;
        if(!area || !description){
            return res.status(400).json({
                message:"area and description required",
                status:false
            })
        }

        const existArea = await Area.findById(area);
        if(!existArea){
            return res.status(404).json({
                message:"area is not found",
                status:false
            })
        }

        const alreadyRequested = await Request.findOne({
            user: req.userId,
            status:"pending"
        });

        if(alreadyRequested){
            return res.status(400).json({
                message:"you have already a pending request",
                status:false
            })
        }
        
        const assignedWorker = await User.findOne({assignedArea:area});        
        
        const requests = await Request.create({
            user:req.userId,
            area,
            description,
            assignedWorker:assignedWorker._id

        });
        res.status(201).json({
            message:"request created succssfully",
            status:true,
            requests
        })


        


    }catch(error){
        res.status(500).json({
            message:error.message,
            status:false
        })
    }
}
exports.trackRequests = async(req,res)=>{
    try{
        const requests = await Request.find({
      user: req.userId,   
    })
      .populate("area")
      .populate("assignedWorker", "fullName ");

    res.status(200).json({
      message: "User requests fetched successfully",
      status: true,
      requests,
    });

    }catch(error){
        res.status(500).json({
            message:error.message,
            status:false
        })
    }
}

exports.viewRequest = async(req,res) =>{
    try{

        const requests = await Request.find().populate("user").populate("area")
        res.status(200).json({
            message:"Requests fetched successfully",
            status:true,
            requests
        })


    }catch(error){
         res.status(500).json({
            message:error.message,
            status:false
        })

    }
}

exports.updateRequest = async(req,res)=>{
    try{
        const{id} = req.params;
        const { area, description } = req.body;

        const request = await Request.findOne({
      _id: id,
      user: req.userId,
    });
    if (!request) {
      return res.status(404).json({
        status: false,
        message: "Request not found",
      });
    }
    if (request.status !== "pending") {
      return res.status(400).json({
        status: false,
        message: "You can edit only pending requests",
      });
    }
    if (area) request.area = area;
    if (description) request.description = description;

    await request.save();

    res.status(200).json({
      status: true,
      message: "Request updated successfully",
      request,
    });

    }catch(error){
        res.status(500).json({
            message:error.message,
            status:false
        })

    }
}


exports.deleteRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const request = await Request.findById(id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

   
    if (request.status === "completed") {
      return res.status(400).json({
        success: false,
        message: "Completed requests cannot be deleted",
      });
    }

    await Request.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Request deleted successfully",
    });
  } catch (error) {
    console.error("Delete request error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
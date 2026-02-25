const Request = require("../models/requestModel");
const User = require("../models/userModel")
const Area = require("../models/areaModel");


exports.viewWorkerRequests = async (req, res) => {
  try {
    if (!req.user.assignedArea) {
      return res.status(400).json({
        message: "No area assigned to this worker",
        status: false,
      });
    }

    const status = req.query.status || "pending";

    const requests = await Request.find({
      area: req.user.assignedArea,
      status: status,
    })
      .populate("user")
      .populate("area");

    res.status(200).json({
      message: "Worker requests fetched successfully",
      status: true,
      requests,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: false,
    });
  }
};

exports.completeRequests = async (req,res) =>{
  try{
    const requestId = req.params.id;
    // const workerId = req.userId;
    const workerId = req.user._id

    const request = await Request.findById(requestId)
    if(!request){
      return res.status(404).json({
        message: "Request not found",
        status: false,
      });
    }
    if (request.area.toString() !== req.user.assignedArea.toString()) {
      return res.status(403).json({
        message: "This request does not belong to your area",
        status: false,
      });
    }
    if (request.status === "completed") {
      return res.status(400).json({
        message: "Request already completed",
        status: false,
      });
    }

    request.status = "completed";
    request.assignedWorker = workerId;
  
    await request.save();

    res.status(200).json({
      message: "Request marked as completed",
      status: true,
      request,
    });

  }catch(error){
    res.status(500).json({
      message:error.message,
      status:false
    })
  }
}



exports.addWorker = async (req, res) => {
  try {
    const { fullName, email, password, areaId } = req.body;

    if (!fullName || !email || !password || !areaId) {
      return res.status(400).json({
        message: "All fields are required",
        status: false,
      });
    }

    
    const area = await Area.findById(areaId);
    if (!area) {
      return res.status(404).json({
        message: "Area not found",
        status: false,
      });
    }

    
    const worker = await User.create({
      fullName,
      email,
      password,
      role: "worker",
      assignedArea: areaId,
    });
await worker.populate("assignedArea");
    res.status(201).json({
      message: "Worker added and area assigned successfully",
      status: true,
      worker,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: false,
    });
  }
};
exports.editWorker = async(req,res)=>{
  try{
    const {id} = req.params;
    console.log("workerid------->",id);
    if(!id){
      return res.status(400).json({
        message:"id is missing",
        status:false
      })
    }
    // const updatedWorker = await User.findByIdAndUpdate(id,
    //   req.body,
    //   {new:true,
    //     runValidators:true
    //   }
    // )
    const { fullName, email, areaId } = req.body;

const updatedWorker = await User.findByIdAndUpdate(
  id,
  {
    fullName,
    email,
    assignedArea: areaId,
  },
  { new: true, runValidators: true }
).populate("assignedArea");
    res.status(200).json({
      message:"worker updated successfully",
      status:true,
      updatedWorker
    })

  }catch(error){
    res.status(500).json({
      message:error.message,
      status:false
    })
  }
}



exports.deleteWorker = async(req,res)=>{
  try{
    const {id} = req.params;
    if(!id){
      return res.status(400).json({
        message:"id is missing",
        status:false
      })
    }

    const worker = await User.findById(id);
    if(!worker){
      return res.status(404).json({
        message:"worker is not found",
        status:false
      })
    }

    if(worker.role !== "worker"){
      return res.status(400).json({
        message:"Only workers can be deleted",
        status:false
      })
    }

    const deletedWorker = await User.findByIdAndDelete(id);
    if(!deletedWorker){
      return res.status(404).json({
        message:"worker is not found",
        status:false
      })
    }

    res.status(200).json({
      message:"worker deleted successfully",
      status:true,
      deletedWorker
    });

  }catch(error){
    res.status(500).json({
      message:error.message,
      status:false
    })
  }
}


exports.getWorker = async(req,res)=>{
  try{
    // const workers = await User.find({role :"worker"})
    const workers = await User.find({ role: "worker" }).populate("assignedArea"); 
    res.status(200).json({
      message:"listed all worker here",
      status:true,
      workers
    })

  }catch(error){
    res.status(500).json({
      message:error.message,
      status:false
    })
  }
}

exports.updateStatus = async(req,res)=>{
  try{
    const {id} = req.params;
    const user = await User.findById(id);
    if(!user){
      return res.status(404).json({
        status:false,
        message:"user not found"
      })
    }
    user.status = !user.status;
    await user.save();
    res.status(200).json({
      status:true,
      message:"user status updated successfully!!"
    })

  }catch(error){
    res.status(500).json({
      message:error.message,
      status:false
    })
  }
}

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" });

    res.status(200).json({
      status: true,
      users
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message
    });
  }
};


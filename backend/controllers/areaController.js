const Area = require("../models/areaModel");
exports.addArea = async(req,res)=>{
    try{
        const area = await Area.create(req.body);
        res.status(201).json({
            message:"area is added successfully",
            status:true,
            area
        })


    }catch(error){
        res.status(500).json({
            message:error.message,
            status:false
        })
    }

}

exports.getArea = async(req,res)=>{
    try{
        const area =  await Area.find()
        res.status(200).json({
            message:"list all areas",
            status:true,
            area
        })

    }catch(error){
        res.status(500).json({
            message:error.message,
            status:false
        })
    }
}

exports.editArea = async(req,res)=>{
    try{
        const{id} = req.params;
        console.log("areaid is ------->",id);
        if(!id){
            return res.status(400).json({
                message:"id is missing",
                status:false
            })
        }

        const updatedArea = await Area.findByIdAndUpdate(id,
            req.body,
            {new:true,
                runValidators:true
            }
        )

        if(!updatedArea){
            return res.status(404).json({
                message:"area is not found",
                status:false
            })
        }
        res.status(200).json({
            message:"area updated successfully",
            status:true,
            updatedArea
        })
     



    }catch(error){
        res.status(500).json({
            message:error.message,
            status:false
        })
    }
}
exports.deleteArea = async(req,res)=>{
    try{
        const {id} = req.params;
        if(!id){
            return res.status(400).json({
                message:"id is not found",
                status:false
            })
        }
        const deleteArea = await Area.findByIdAndDelete(id)

        if(!deleteArea){
            return res.status(404).json({
                message:"this area is not found",
                status:false
            })
        }

        res.status(200).json({
            message:"area is deleted successfully",
            status:true
        })

    }catch(error){
        res.status(500).json({
            message:error.message,
            status:false
        })
    }
}
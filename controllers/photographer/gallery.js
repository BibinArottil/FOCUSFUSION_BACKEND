const photographerModel = require("../../models/photographer/photographerModel")

exports.gallery = async (req,res)=>{
    try {
        const id = req.body.id
        const data = await photographerModel.findById(id)
        const images = data.images
        res.status(200).json(images)
    } catch (error) {
        console.log(error);
    }
}

exports.addImage = async (req,res)=>{
    try {
        const id = req.body.id
        const images = req.files.map((image)=>image.path)
        await photographerModel.findByIdAndUpdate(id,{$push:{images:images}})
        res.status(200).json({success:true})
    } catch (error) {
        console.log(error);
    }
}
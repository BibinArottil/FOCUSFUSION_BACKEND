const photographerModel = require("../../models/photographer/photographerModel")

exports.profile = async(req,res) =>{
    try {
        const id = req.params.id
        const details = await photographerModel.findById(id)
        res.status(200).json(details)
    } catch (error) {
        console.log(error)
    }
}

exports.updateProfile = async(req,res)=>{
    try {
        const id = req.body.id
        const company = req.body.value.companyName
        const name = req.body.value.name
        await photographerModel.findByIdAndUpdate(id,{$set:{name:name,companyName:company}})
        res.status(200).json({success:"Update successful"})
    } catch (error) {
        console.log(error);
    }
}

exports.addLogo = async(req,res)=>{
    try {
        const id = req.params.id
        const pic = req.file.path
        await photographerModel.findByIdAndUpdate(id,{$set:{logo:pic}})
        res.status(200).json("Logo uploading successful")
    } catch (error) {
        res.status(401).json("Please choose an image")
        console.log(error);
    }
}

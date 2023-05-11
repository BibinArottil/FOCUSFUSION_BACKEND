const reviewModel = require("../../models/user/reviewModel")

exports.getReviews = async(req,res)=>{
    try {
        const id = req.params.id
        const list = await reviewModel.find({company:id}).populate("user")
        res.status(200).json({data:list})
    } catch (error) {
        console.log(error)
    }
}

exports.reply = async(req,res)=>{
    try {
        const id = req.params.id
        const reply = req.body.value
        await reviewModel.findByIdAndUpdate(id,{$set:{reply:reply}})
        res.status(200).json({message:"Reply added"})
    } catch (error) {
        console.log(error)
    }
}
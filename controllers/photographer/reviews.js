const reviewModel = require("../../models/user/reviewModel")

exports.getReviews = async(req,res)=>{
    try {
        const id = req.params.id
        const list = await reviewModel.find({company:id}).populate("user")
        console.log(list)
    } catch (error) {
        console.log(error)
    }
}
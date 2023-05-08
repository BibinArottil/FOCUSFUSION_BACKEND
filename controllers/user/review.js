const reviewModel= require("../../models/user/reviewModel")

exports.addReview= async(req,res)=>{
    try {
        const {rating,review} =req.body.value
        const company = req.body.details.company._id
        const user = req.body.details.user
        const newReview= new reviewModel({
            company:company,
            user:user,
            rating,
            review
        })
        await newReview.save()
        res.status(200).json({message:"Thanks for your rating"})
    } catch (error) {
        console.log(error);
    }
}

exports.viewReview = async(req,res)=>{
    try {
        const id = req.params.id
        const data = await reviewModel.find({company:id}).populate("user")
        res.status(200).json({reviews:data})
    } catch (error) {
        console.log(error)
    }
}
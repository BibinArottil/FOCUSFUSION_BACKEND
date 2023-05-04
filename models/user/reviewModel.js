const mongoose=require("mongoose")

const reviewSchema = new mongoose.Schema({
    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"photographer",
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    review:String
})

const review = mongoose.model("Review",reviewSchema)
module.exports = review
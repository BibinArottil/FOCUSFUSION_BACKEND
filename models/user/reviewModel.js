const mongoose=require("mongoose")

const reviewSchema = new mongoose.Schema({
    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Photographer",
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    review:String,
    reply:String
},
{
    timestamps:true
}
)

const review = mongoose.model("Review",reviewSchema)
module.exports = review
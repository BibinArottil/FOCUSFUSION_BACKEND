const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema({
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
    location:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    bookingDate:{
        type:Date,
        default:Date.now()
    },
    advance:{
        type:Number,
        required:true
    },
    totalAmount:Number,
    status:{
        type:String,
        default:"Pending"
    },
    advancePaid:Number,
    balance:Number,
    success:{
        type:Boolean,
        default:false
    }
})

const booking = mongoose.model("Booking",bookingSchema)

module.exports=booking
const mongoose = require("mongoose")

const bannerSchema = new mongoose.Schema({
    image:{
        type:String,
        required:true
    },
    // name:{
    //     type:String,
    //     required:true
    // },
    status:{
        type:Boolean,
        default:true
    }
})

const banner = mongoose.model("banner",bannerSchema)
module.exports = banner
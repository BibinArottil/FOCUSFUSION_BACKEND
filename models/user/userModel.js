const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim:true
    },
    mobile:{
        type: Number,
        required:true,
        trim:true
    },
    email:{
        type: String,
        required:true,
        trim:true
    },
    password:{
        type: String,
        required:true
    },
    status:{
        type:Boolean,
        default:true
    },
    image: String
})

const user = mongoose.model("User", userSchema);
module.exports = user;
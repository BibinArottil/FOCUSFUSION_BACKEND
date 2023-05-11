const photographerModel = require("../../models/photographer/photographerModel")
const userModel = require("../../models/user/userModel")
const bookingModel =require("../../models/user/booking")

exports.count=async(req,res)=>{
    try {
        const user = await userModel.countDocuments()
        const photographer = await photographerModel.countDocuments({verified:true})
        const works = await bookingModel.countDocuments({status:"Completed"})
        const pending = await bookingModel.countDocuments({status:"Pending"})
        const confirm = await bookingModel.countDocuments({status:"Confirmed"})
        const processing = await bookingModel.countDocuments({status:"Processing"})
        const cancel = await bookingModel.countDocuments({status:"Cancelled"})
        const response ={
            user,
            photographer,
            works,
            pending,
            confirm,
            processing,
            cancel
        }
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
    }
}
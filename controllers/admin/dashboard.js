const photographerModel = require("../../models/photographer/photographerModel")
const userModel = require("../../models/user/userModel")
const bookingModel =require("../../models/user/booking")

exports.count=async(req,res)=>{
    try {
        const user = await userModel.countDocuments()
        const photographer = await photographerModel.countDocuments({verified:true})
        const works = await bookingModel.countDocuments({status:"Completed"})
        const response ={
            user,
            photographer,
            works
        }
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
    }
}
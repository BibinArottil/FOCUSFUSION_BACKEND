const bookingModel = require('../../models/user/booking')

exports.viewWorks=async(req,res)=>{
    try {
        const works = await bookingModel.find().populate("user").populate("company").sort({_id:-1})
        res.status(200).json({data:works})
    } catch (error) {
        console.log(error);
    }
}
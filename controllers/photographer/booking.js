const bookingModel = require('../../models/user/booking')

exports.viewBookings = async(req,res)=>{
    try {
        const id = req.params.id
        const bookingList = await bookingModel.find({company:id}).populate("user").sort({_id:-1})
        res.status(200).json({list:bookingList})
    } catch (error) {
        console.log(error);
    }
}

exports.updateBooking = async (req,res)=>{
    try {
        const id = req.params.id
        const {amount, status} = req.body.value
        console.log(req.body.value)
        if(amount==''){
            await bookingModel.findByIdAndUpdate(id,{$set:{status:status}})
            res.status(200).json({message:"Status updated"})
        }else{
            await bookingModel.findByIdAndUpdate(id,{$set:{totalAmount:amount,status:status}})
            const data = await bookingModel.findById(id)
            await bookingModel.findByIdAndUpdate(id,{$inc:{balance:data.totalAmount-data.advance}})
            res.status(200).json({message:"Successfully updated"})
        }
    } catch (error) {
        console.log(error);
    }
}
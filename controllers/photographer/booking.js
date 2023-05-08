const bookingModel = require('../../models/user/booking')

exports.viewBookings = async(req,res)=>{
    try {
        const id = req.params.id
        // const bookingList = await bookingModel.find({company:id,success:false}).populate("user").sort({_id:-1})
        const bookingList = await bookingModel.find({company:id,$and:[{PhotographerPayment:false},{status:{$ne:"Cancelled"}}]}).populate("user").sort({_id:-1})
        res.status(200).json({list:bookingList})
    } catch (error) {
        console.log(error);
    }
}

exports.updateBooking = async (req,res)=>{
    try {
        const id = req.params.id
        const {amount, status} = req.body.value
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

exports.histroy=async (req,res)=>{
    try {
        const id = req.params.id
        const list = await bookingModel.find({company:id,$or:[{PhotographerPayment:true},{status:"Cancelled"}]}).populate("user").sort({_id:-1})
        res.status(200).json({data:list})
    } catch (error) {
        console.log(error);
    }
}
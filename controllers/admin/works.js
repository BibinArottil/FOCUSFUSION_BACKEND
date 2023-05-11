const bookingModel = require("../../models/user/booking");

exports.viewWorks = async (req, res) => {
  try {
    const works = await bookingModel
      .find({PhotographerPayment:false})
      .populate("user")
      .populate("company")
      .sort({ _id: -1 });
    res.status(200).json({ data: works });
  } catch (error) {
    console.log(error);
  }
};

exports.photographerPayment = async (req, res) => {
  try {  
    const id = req.params.id;
    const amount = req.body.amount;
    await bookingModel.findByIdAndUpdate(id, {
      $set: { photographerAmount: amount, PhotographerPayment: true },
    });
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
  }
};

exports.history=async(req,res)=>{
    try {
        // const list = await bookingModel.find({$or:[{photographerPayment:true},{status:"Cancelled"}]}).populate("company").populate("user").sort({_id:-1})
        const list = await bookingModel.find({PhotographerPayment:true}).populate("company").populate("user").sort({_id:-1})
        res.status(200).json({data:list})
    } catch (error) {
        console.log(error);
    }
}

exports.sales=async(req,res)=>{
  try {
    const {from ,to}= req.body
    const data = await bookingModel.find({PhotographerPayment:true,updatedAt:{$gte:from,$lt:to}}).populate('company').sort({_id:-1})
    // const total = await bookingModel.aggregate([{$match:{$and:[{PhotographerPayment:true,updatedAt:{$gte:from,$lt:to}}]}},{$group:{_id:1}}])
    // console.log(total)
    res.status(200).json({data:data})
  } catch (error) {
    console.log(error)
  }
}

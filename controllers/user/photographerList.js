const photographerModel = require("../../models/photographer/photographerModel")

exports.photographerList = async(req,res)=>{
    try {
        const listData = await photographerModel.find({$and:[{verified:true,status:true}]})
        res.json(listData)
    } catch (error) {
        console.log(error);
    }
}
const photographerModel = require("../../models/photographer/photographerModel");
const mailer = require('../../utilities/nodemailer');
const { login } = require("../photographer/photographerController");

exports.request = async (req, res) => {
  try {
    const request = await photographerModel.find({$and:[{verified:false},{rejected:false}]});
    res.status(200).json({ request });
  } catch (error) {
    console.log(error);
  }
};

exports.accept = async (req, res) => {
  try {
    const {id,email} = req.body
    await photographerModel.findByIdAndUpdate(id, { $set: { verified: true } });
    let mailDetails={
      from:process.env.AUTH_EMAIL,
      to:email,
      subject:'FOCUSFUSION',
      html:process.env.ACCEPT,
  }
  mailer.mailTransporter.sendMail(mailDetails,(err,data)=>{
    if(err){
        console.log(err,'error');
    }else{
        console.log(data,'accept mailed');
    }
})
    res.json({ success: true });
  } catch (error) {
    console.log(error);
  }
};

exports.reject = async (req, res) => {
  try {
    const {id,email} = req.body
    await photographerModel.findByIdAndUpdate(id,{$set:{rejected:true}})
    let mailDetails={
      from:process.env.AUTH_EMAIL,
      to:email,
      subject:'FOCUSFUSION',
      html:process.env.REJECT,
  }
  mailer.mailTransporter.sendMail(mailDetails,(err,data)=>{
    if(err){
        console.log(err,'error');
    }else{
        console.log(data,'reject mailed');
    }
  })
    res.json({success:true})
  } catch (error) {
    console.log(error);
  }
};

exports.list = async (req, res) => {
  try {
    const list = await photographerModel.find({ verified: true });
    res.status(200).json({ list });
  } catch (error) {
    console.log(error);
  }
};

exports.block = async (req, res) => {
  try {
    const id = req.body.id
    const find = await photographerModel.findById(id)
    if(find.status===true){
        await photographerModel.findByIdAndUpdate(id,{$set:{status:false}})
        res.json({success:true})
    }else{
        await photographerModel.findByIdAndUpdate(id,{$set:{status:true}})
        res.json({success:true})
    }
  } catch (error) {
    console.log(error);
  }
};

exports.viewImages=async(req,res)=>{
  try {
    const {id} =req.body
    const data = await photographerModel.findById(id)
    if(data){
      res.status(200).json({data:data})
    }
  } catch (error) {
    console.log(error);
  }
}

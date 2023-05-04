const UserModel = require('../../models/user/userModel')

exports.userList = async (req,res)=>{
    try {
        const list = await UserModel.find()
        res.json({list})
    } catch (error) {
        console.log(error);
    }
}

exports.block = async (req, res) => {
    try {
      const id = req.body.id
      console.log(id);
      const find = await UserModel.findById(id)
      if(find.status===true){
          await UserModel.findByIdAndUpdate(id,{$set:{status:false}})
          res.json({success:true})
      }else{
          await UserModel.findByIdAndUpdate(id,{$set:{status:true}})
          res.json({success:true})
      }
    } catch (error) {
      console.log(error);
    }
  };
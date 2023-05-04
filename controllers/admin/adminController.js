const adminModel = require("../../models/admin/adminModel");
const jwt = require("jsonwebtoken");

exports.adminLogin = async (req, res) => {
  try {
    const createToken = (_id) => {
      return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    };
    const data = req.body;
    const admin = await adminModel.findOne({ email: data.email });
    if (admin) {
      if (admin.email === data.email && admin.password === data.password) {
        const token = createToken(admin._id);
        console.log(token);
        res
          .status(200)
          .json({ messahe: "Admin login successful", token });
      } else {
        res.status(401).json("Email or Password invalid");
      }
    } else {
      res.status(401).json("Invalid credentials");
    }
  } catch (error) {
    console.log(error);
  }
};

exports.adminVerifyToken = async (req,res)=>{
  try {
    const token = req.body.token
    const decoded = await jwt.verify(token,process.env.JWT_SECRET)
    const adminId = decoded._id
   await adminModel.findById(adminId)
   .then((admin)=>{
    if(admin){
      return res.status(200).json({ admin: true });
    }else{
      return res.json({ admin: false });
    }
   })
  } catch (error) {
    console.log(error);
    return res.json({ admin: false });
  }
}

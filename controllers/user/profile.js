const userModel = require("../../models/user/userModel");

exports.profile = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await userModel.findById(id);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

exports.addProfilePic = async (req, res) => {
  try {
    const id = req.params.id;
    const pic = req.file.path;
    await userModel.findByIdAndUpdate(id, { $set: { image: pic } });
    res.status(200).json("Profile photo uploading successful");
  } catch (error) {
    res.status(401).json("Please choose an image");
    console.log(error);
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { _id, name } = req.body.value;
    await userModel.findByIdAndUpdate(_id, { $set: { name: name } });
    res.status(200).json({ message: "Name successfully updated" });
  } catch (error) {
    console.log(error);
  }
};

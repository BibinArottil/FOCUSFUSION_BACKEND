const bannerModel = require("../../models/admin/bannerModel");

exports.list = async (req, res) => {
  try {
    const list = await bannerModel.find();
    res.json({ list });
  } catch (error) {
    console.log(error);
  }
};

exports.add = async (req, res) => {
  try {
    // const name = req.body.name.toUpperCase()
    const image = req.file.path;
    // const data = await bannerModel.findOne({ name: name });
    // if (data) {
    //   res.status(401).json({ message: "This banner name is already exist" });
    // }else{
        const newBanner = new bannerModel({
            // name:name,
            image:image
        })
        await newBanner.save()
        res
        .status(201)
        .json({ message: `New banner added`, success: true });
    // }
  } catch (error) {
    console.log(error);
  }
};

exports.block = async (req, res) => {
    try {
      const id = req.body.id;
      const find = await bannerModel.findById(id);
      if (find.status === true) {
        await bannerModel.findByIdAndUpdate(id, { $set: { status: false } });
        res.json({ success: true });
      } else {
        await bannerModel.findByIdAndUpdate(id, { $set: { status: true } });
        res.json({ success: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  exports.edit = async (req, res) => {
    try {
      const id = req.body.id;
      const image = req.file.path
      await bannerModel.findByIdAndUpdate(id,{$set:{image:image}})
      res
      .status(201)
      .json({ success: true });
    } catch (error) {
      console.log(error);
    }
  };

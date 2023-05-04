const categoryModel = require("../../models/admin/categoryModel");

exports.list = async (req, res) => {
  try {
    const list = await categoryModel.find().sort({_id:-1})
    res.json({ list });
  } catch (error) {
    console.log(error);
  }
};

exports.add = async (req, res) => {
  try {
    const name = req.body.text.toUpperCase();
    const existName = await categoryModel.findOne({ name: name });
    if (existName) {
      res.status(401).json({ message: "This category name is already exist" });
    } else {
      const newName = new categoryModel({ name: name });
      await newName.save();
      res
        .status(201)
        .json({ message: `New ${name} category added`, success: true });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.block = async (req, res) => {
  try {
    const id = req.body.id;
    const find = await categoryModel.findById(id);
    if (find.status === true) {
      await categoryModel.findByIdAndUpdate(id, { $set: { status: false } });
      res.json({ success: true });
    } else {
      await categoryModel.findByIdAndUpdate(id, { $set: { status: true } });
      res.json({ success: true });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.edit = async (req, res) => {
  try {
    const id = req.body.id;
    const name = req.body.value.text.toUpperCase();
    const existName = await categoryModel.findOne({ name: name });
    if (existName) {
      res.status(401).json({ message: "This category name is already exist" });
    } else {
      await categoryModel.findByIdAndUpdate(id, { $set: { name: name } });
      res
      .status(201)
      .json({ message: "Category updated", success: true });
    }
  } catch (error) {
    console.log(error);
  }
};

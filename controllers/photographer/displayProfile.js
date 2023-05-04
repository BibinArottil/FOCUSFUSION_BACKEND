const categoryModel = require("../../models/admin/categoryModel");
const photographerModel = require("../../models/photographer/photographerModel");

exports.profile = async (req, res) => {
  try {
    const id = req.params.id;
    const listCategory = await categoryModel.find();
    const details = await photographerModel.findById(id)
    res.status(200).json({listCategory,details});
  } catch (error) {
    console.log(error);
  }
};

exports.updateProfile = async(req,res)=>{
  try {
    const id = req.body.id
    const {location, aboutUs, category, owncategory} = req.body.values
        if (location && category && owncategory && aboutus) {
      const find = await categoryModel.findOne({
        name: owncategory.toUpperCase(),
      });
      if (find) {
        res.status(401).json({ message: "Category already exist" });
      } else {
        await photographerModel.findByIdAndUpdate(id, {
          $set: {
              location: location,
              category: owncategory.toUpperCase(),
              aboutUs: aboutUs,
          },
        });
        const newCategory = new categoryModel({
          name:owncategory.toUpperCase()
        })
        await newCategory.save()
      }
    } else if (location && category && aboutUs) {
      await photographerModel.findByIdAndUpdate(id, {
        $set: {
            location: location,
            category: category,
            aboutUs: aboutUs,
        },
      });
      res.status(200).json({message:"Display profile fields updated"})
    } else {
      console.log("error");
      res.status(401).json({message:"You should submit the given fields"})
    }
  } catch (error) {
    console.log(error)
  }
}

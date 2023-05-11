const photographerModel = require("../../models/photographer/photographerModel");

exports.photographerList = async (req, res) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 2;
    const search = req.query.search || "";
    const listData = await photographerModel
      .find({
        $and: [
          {
            verified: true,
            status: true,
            category: { $regex: search, $options: "i" },
          },
        ],
      })
      .skip(page * limit)
      .limit(limit);
    const total = await photographerModel
      .find({
        $and: [
          {
            verified: true,
            status: true,
            category: { $regex: search, $options: "i" },
          },
        ],
      })
      .count();
    const response = { listData, page: page + 1, limit, total };
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

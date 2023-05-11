const reviewModel = require("../../models/user/reviewModel");

exports.addReview = async (req, res) => {
  try {
    const { rating, review } = req.body.value;
    const company = req.body.details.company._id;
    const user = req.body.details.user;
    const newReview = new reviewModel({
      company: company,
      user: user,
      rating,
      review,
    });
    await newReview.save();
    res.status(200).json({ message: "Thank you for your review" });
  } catch (error) {
    console.log(error);
  }
};

exports.viewReview = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await reviewModel.find({ company: id }).populate("user");
    res.status(200).json({ reviews: data });
  } catch (error) {
    console.log(error);
  }
};

exports.ownReview = async (req, res) => {
  try {
    const id = req.params.id;
    const review = await reviewModel
      .find({ user: id })
      .populate("company")
      .sort({ _id: -1 });
    res.status(200).json({ data: review });
  } catch (error) {
    console.log(error);
  }
};

exports.ownReviewEdit = async (req, res) => {
  try {
    const id = req.params.id;
    const { rating, review } = req.body.value;
    if (rating === "") {
      await reviewModel.findByIdAndUpdate(id, { $set: { review: review } });
      res.status(200).json({ message: "Review updated" });
    } else {
      await reviewModel.findByIdAndUpdate(id, {
        $set: { rating: rating, review: review },
      });
      res.status(200).json({ message: "Rating and review updated" });
    }
  } catch (error) {
    console.log(error);
  }
};

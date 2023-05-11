const bookingModel = require("../../models/user/booking");

exports.shootBooking = async (req, res) => {
  try {
    const { company, location, time, date, advance, userId } = req.body;
    const newBooking = new bookingModel({
      company,
      location,
      time,
      date,
      advance,
      user: userId,
    });
    await newBooking.save();
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
  }
};

exports.viewBooking = async (req, res) => {
  try {
    const id = req.params.id;
    const list = await bookingModel
      .find({ user: id, success: false })
      .populate("company")
      .sort({ _id: -1 });
    res.status(200).json({ data: list });
  } catch (error) {
    console.log(error);
  }
};

exports.updateSuccess = async (req, res) => {
  try {
    const id = req.params.id;
    await bookingModel.findByIdAndUpdate(id, { $set: { success: true } });
    res.status(200).json({ message: "Payment successful" });
  } catch (error) {
    console.log(error);
  }
};

exports.bookingCancel = async (req, res) => {
  try {
    const id = req.params.id;
    await bookingModel.findByIdAndUpdate(id, { $set: { status: "Cancelled" } });
    res.status(200).json({ message: "Cancelation updated" });
  } catch (error) {
    console.log(error);
  }
};

exports.history = async (req, res) => {
  try {
    const id = req.params.id;
    const list = await bookingModel
      .find({ user: id, success: true })
      .populate("company")
      .sort({ _id: -1 });
    res.status(200).json({ data: list });
  } catch (error) {
    console.log(error);
  }
};

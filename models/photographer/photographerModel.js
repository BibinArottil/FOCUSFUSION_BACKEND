const mongoose = require("mongoose");

const photographerSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  mobile: {
    type: Number,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  initialImage: [
    {
      type: String,
      required: true,
    },
  ],
  images: [
    {
      type: String,
    },
  ],
  category: {
    type: String,
    trim: true,
  },
  location: {
    type: String,
    trim: true,
  },
  aboutUs: {
    type: String,
    trim: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  rejected: {
    type: Boolean,
    default: false,
  },
});

const photographer = mongoose.model("Photographer", photographerSchema);
module.exports = photographer;

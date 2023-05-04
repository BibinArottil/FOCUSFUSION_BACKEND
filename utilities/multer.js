const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const path = require("path");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});
const cloudstorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "project2",
  },
});
const upload = multer({
  storage: cloudstorage,
  fileFilter: (req, file, callback) => {
    //image validation for files other than required format,can avoid this  field if validain is not required
    if (
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/png" ||
      file.mimetype == "image/gif" ||
      file.mimetype == "image/avif"
    ) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
});

module.exports = upload;

// const storage = multer.diskStorage({
//   destination: '../public/image',
//   filename: (req, file, cb) => {
//       cb(null, file.originalname + '-' + Date.now()+'.jpg');
//   }
// });

// const bannerUpload = multer({ storage: storage});

// module.exports = bannerUpload;

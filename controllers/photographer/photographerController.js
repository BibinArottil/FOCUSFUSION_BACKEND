const PhotographerModel = require("../../models/photographer/photographerModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { companyname, name, mobile, email, password } = req.body;
    const image = req.files.map((image) => image.path);
    const existEmail = await PhotographerModel.findOne({ email: email });
    if (existEmail) {
      res.status(401).json("Email is already registerd");
    } else {
      const passwordHash = await bcrypt.hash(password, 10);
      const newPhotographer = new PhotographerModel({
        companyName: companyname,
        name: name,
        mobile: mobile,
        email: email,
        initialImage: image,
        password: passwordHash,
      });
      await newPhotographer.save();
      res.status(201).json("Registeration successful");
    }
  } catch (error) {
    console.log(error);
  }
};

exports.login = async (req, res) => {
  try {
    const createToken = (_id) => {
      return jwt.sign({ _id }, process.env.JWT_SECRET_PHOTOGRAPHER, {
        expiresIn: "1d",
      });
    };
    const { email, password } = req.body;
    const data = await PhotographerModel.findOne({ email });
    if (data) {
      if (data.rejected === false) {
        if (data.verified === true) {
          if (data.status === true) {
            const passwordMatch = await bcrypt.compare(password, data.password);
            if (data.email === email && passwordMatch === true) {
              const photographerToken = createToken(data._id);
              res.status(200).json({
                message: "Photographer login successful",
                success: true,
                photographerToken,
                photographer: data,
              });
            } else {
              res.status(401).json("Email or Password invalid");
            }
          } else {
            res.status(401).json("Your account is blocked by admin");
          }
        } else {
          res
            .status(401)
            .json({ message: "Your verification is pending", pending: true });
        }
      } else {
        res
          .status(401)
          .json({ message: "Your request is rejected", reject: true });
      }
    } else {
      res.status(401).json("Invalid credentials");
    }
  } catch (error) {
    console.log(error);
  }
};

exports.photographerVerifyToken = async (req, res) => {
  try {
    const token = req.body.token;
    const decoded = await jwt.verify(
      token,
      process.env.JWT_SECRET_PHOTOGRAPHER
    );
    const photographerId = decoded._id;
    await PhotographerModel.findById(photographerId).then((photographer) => {
      if (photographer) {
        return res.status(200).json({ photographer: true });
      } else {
        return res.json({ photographer: false });
      }
    });
  } catch (error) {
    console.log(error);
    return res.json({ photographer: false });
  }
};

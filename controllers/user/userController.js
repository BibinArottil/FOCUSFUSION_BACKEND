const twilio = require("../../utilities/twilio");
const userModel = require("../../models/user/userModel");
const bannerModel = require("../../models/admin/bannerModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const number = req.body.mobile;
    const existUser = await userModel.findOne({ mobile: number });
    if (existUser) {
      res
        .status(401)
        .json({ message: "Mobile number already registered", state: false });
    } else {
      twilio.sendVerificationToken(number);
      res.status(200).json({ message: "OTP send" });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.otpVerify = async (req, res) => {
  try {
    const otp = req.body.OTP;
    const number = req.body.data.mobile;
    const userData = req.body.data;
    const { name, mobile, email, password } = req.body.data;
    if (userData.data === "forgot") {
      const twilioStatus = await twilio.checkVerificationToken(otp, number);
      if (twilioStatus) {
        res
          .status(200)
          .json({ message: "Forgot password OTP verified", forgot: true });
      } else {
        res.status(401).josn("Invalid OTP");
      }
    } else {
      const twilioStatus = await twilio.checkVerificationToken(otp, number);
      if (twilioStatus) {
        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = new userModel({
          name: name,
          mobile: mobile,
          email: email,
          password: passwordHash,
        });
        await newUser.save();
        res.status(201).json({ user: newUser._id, signup: true });
      } else {
        res.status(401).json("Invalid OTP");
      }
    }
  } catch (error) {
    console.log(error);
  }
};

exports.userLogin = async (req, res) => {
  try {
    const createToken = (_id) => {
      return jwt.sign({ _id }, process.env.JWT_SECRET_USER, {
        expiresIn: "1d",
      });
    };
    const { mobile, password } = req.body;
    const existUser = await userModel.findOne({ mobile: mobile });
    if (existUser) {
      const passwordMatch = await bcrypt.compare(password, existUser.password);
      if (existUser.status) {
        if (mobile == existUser.mobile && passwordMatch == true) {
          const userToken = createToken(existUser._id);
          res.status(200).json({
            loggedIn: true,
            user: {
              _id: existUser._id,
              name: existUser.name,
              email: existUser.email,
              mobile: existUser.mobile,
              image: existUser.image,
            },
            userToken,
          });
        } else {
          res.status(401).json("Incorrect Mobile No: or Password");
        }
      } else {
        res.status(401).json("You account is blocked");
      }
    } else {
      res.status(401).json("Invalid credentials");
    }
  } catch (error) {
    console.log(error);
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const number = req.body.mobile;
    const existNumber = await userModel.findOne({ mobile: number });
    if (existNumber) {
      twilio.sendVerificationToken(number);
      res.status(200).json("Registerd mobile number");
    } else {
      res.status(401).json("Mobile number is not registered");
    }
  } catch (error) {
    console.log(error);
  }
};

exports.newPassword = async (req, res) => {
  try {
    const data = req.body;
    const number = data.data.mobile;
    if (data.password === data.confirmPassword) {
      const passwordHash = await bcrypt.hash(data.password, 10);
      await userModel.updateOne(
        { mobile: number },
        { $set: { password: passwordHash } }
      );
      res.status(200).json("Your password is changed");
    } else {
      res.status(401).json("Password not match");
    }
  } catch (error) {
    console.log(error);
  }
};

exports.banner = async (req, res) => {
  try {
    const image = await bannerModel.find({ status: true });
    const banner = image.map((image) => image.image);
    res.json({ banner });
  } catch (error) {
    console.log(error);
  }
};

exports.getUser = async (req, res) => {
  try {
    const userId = req.body.userId;
    const existUser = await userModel.findById(userId);
    res.status(200).json(existUser);
  } catch (error) {
    console.log(error);
  }
};

exports.userVerifyToken = async (req, res) => {
  try {
    const token = req.body.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET_USER);
    const userId = decoded._id;
    await userModel.findById(userId).then((user) => {
      if (user) {
        return res.status(200).json({ user: true });
      } else {
        return res.json({ user: false });
      }
    });
  } catch (error) {
    console.log(error);
    return res.json({ user: false });
  }
};

const jwt = require("jsonwebtoken");

const photographerAuth = async (req, res, next) => {
  console.log("photographer token checking");
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send({ message: "Authorization token required" });
  }
  const token = authorization.split(" ")[1];
  try {
    jwt.verify(token, process.env.JWT_SECRET_PHOTOGRAPHER);
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send({ message: "Invalid Authorization" });
  }
};

module.exports = photographerAuth;
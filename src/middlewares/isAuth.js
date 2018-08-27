const jwt = require("jsonwebtoken");

const isAuth = (req, res, next) => {
  console.log("Headers", req.headers);
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "shhhhhh");
    req.userData = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Unauthorized." });
  }
};

module.exports = isAuth;

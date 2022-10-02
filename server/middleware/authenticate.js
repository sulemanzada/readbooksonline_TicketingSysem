const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");

const Authenticate = async (req, res, next) => {
  try {
    /**
     * I misstakenly wrote req.cookie.jwtaaftoken instead of req.cookies.jwtaaftoken
     * and it cost me 3 hours of constant debuging and google search
     */
    const token = req.cookies.jwtaaftoken;
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    const rootUser = await User.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });
    if (!rootUser) {
      throw new Error("User not found");
    }
    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;
    next();
  } catch (err) {
    res.status(401).send("Unautherised: No token provided");
    console.log(err);
  }
};

module.exports = Authenticate;

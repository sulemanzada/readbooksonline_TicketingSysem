const jwt = require("jsonwebtoken");
const { Router } = require("express");
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");
const { roles } = require("../model/constants");

require("../db/conn");

const User = require("../model/userSchema");
const Book = require("../model/bookSchema");
//Require controller
var userController = require("../controllers/user.controller");
const router = Router();
function validateEmail(emailAdress) {
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (emailAdress.match(regexEmail)) {
    return true;
  } else {
    return false;
  }
}
router.post("/user/register", async (req, res) => {
  const { fname, lname, email, password } = req.body;
  // console.log(fname, lname, email, password, cpassword);
  if (!fname || !lname || !email || !password) {
    return res
      .status(422)
      .json({ status: 422, error: "Plz fill the field properly" });
  }
  var isEmailValid = validateEmail(email);
  if (isEmailValid === false) {
    return res.status(422).json({ status: 422, error: "Invalid Credientials" });
  }
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res
        .status(402)
        .json({ status: 402, error: "Email already Exist" });
    }
    // else if (password !== cpassword) {
    //     return res.status(412).json({status: 412, error:"password do not match"});

    // }
    else {
      const user = new User({ fname, lname, email, password });
      const userReg = await user.save();
      res.status(200).json({
        user: user.toObject({ getters: true }),
        message: "user registered successfully",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/user/signin", async (req, res) => {
  try {
    // console.log(req.body);
    var { email, password } = req.body;
    // console.log(typeof(email));
    email = email.toLowerCase();
    // console.log(email);
    if (!email || !password) {
      return res.status(400).json("Please Fill the data properly");
    }
    var isEmailValid = validateEmail(email);
    if (isEmailValid === false) {
      return res.status(400).json("Invalid Credientials");
    }
    const userLogin = await User.findOne({ email: email });
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      // Generating Token
      const token = await userLogin.generateAuthToken();
      //Generating/Storing Cookies

      res.cookie("jwtaaftoken", token, {
        //Expires cookies after 30days (2589200000 milisec)
        // expires: '1d',
        httpOnly: true,
      });

      if (isMatch) {
        // console.log(userLogin.role);
        res
          .status(200)
          .json({ user: userLogin.toObject({ getters: true }), token: token });
        // if (userLogin.role === roles.admin) {
        //     res.status(200).json({message: "User Sign in Successfully"});
        // }
        // else if (userLogin.role === roles.moderator) {
        //     res.status(200).json({message: "User Sign in Successfully"});
        // }
        // else{
        //     res.status(200).json({message: "User Sign in Successfully"});
        // }
      } else {
        res.status(400).json({ error: "Invalid Credientials" });
      }
    } else {
      res.status(400).json({ error: "Invalid Credientials" });
    }
  } catch (err) {
    console.log(err);
  }
});
// create employee, same logic as create account/ register
//but authentication is needed and user role is needed
router.post("/user/createUser", authenticate, async (req, res) => {
  if (req.rootUser.role !== "ADMIN") {
    return res.status(202).json({ status: 202, error: "Not Authorized" });
  }
  const { fname, lname, email, role, password } = req.body;
  if (!fname || !lname || !email || !password || !role) {
    return res.status(422).json({ error: "Plz fill the field properly" });
  }
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res
        .status(422)
        .json({ status: 422, error: "Email already Exist" });
    } else {
      const user = new User({ fname, lname, email, role, password });
      const userReg = await user.save();
      return res
        .status(200)
        .json({ status: 200, message: `${role} registered successfully` });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/user/create", async (req, res) => {
  const { fname, lname, email, role, password, cpassword } = req.body;
  // console.log(fname, lname, email, password, cpassword);
  if (!fname || !lname || !email || !password || !cpassword) {
    return res.status(422).json({ error: "Plz fill the field properly" });
  }
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res
        .status(422)
        .json({ status: 422, error: "Email already Exist" });
    } else if (password !== cpassword) {
      return res.status(422).json({ error: "password do not match" });
    } else {
      const user = new User({ fname, lname, email, role, password, cpassword });
      const userReg = await user.save();
      res.status(201).json({ message: "Employee registered successfully" });
      // console.log(`${user} user registered sucessfully`);
      // console.log(userReg);
    }
  } catch (error) {
    console.log(error);
  }
});

// Delete user and the tickets that were submitted by the user
router.delete("/user/delete/:userId", authenticate, async (req, res) => {
  const deleteUserId = req.params.userId;
  const uRole = req.rootUser.role;

  if (uRole !== "ADMIN") {
    return res.status(202).json({
      status: 202,
      message: "You are not autherized to perform this operation",
    });
  }
  try {
    const userExist = await User.findOne({ _id: deleteUserId });
    if (userExist) {
      const bookList = userExist.bookticket;
      // Delete Book Tickets if any
      if (bookList.length > 0) {
        Book.deleteMany({ _id: { $in: bookList } }, function (error) {});
      }
      await User.deleteOne({ _id: userExist._id });
      return res.status(200).json({ status: 200, message: "Done" });
    } else {
      res.status(412).json({
        message: "Could not delete the employee maybe it doesnt exists",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

router.patch("/user/update/:userId", authenticate, async (req, res) => {
  const updateUserId = req.params.userId;
  const uRole = req.rootUser.role;

  if (uRole !== "ADMIN") {
    return res.status(202).json({
      status: 202,
      message: "You are not autherized to perform this operation",
    });
  }
  const { role } = req.body;
  try {
    const userExist = await User.findOne({ _id: updateUserId });
    if (userExist) {
      userExist.role = role;
      await userExist.save();
      return res.status(200).json({ status: 200, message: "Done" });
    } else {
      res.status(412).json({
        message: "Could not update the user maybe it doesnt exists",
      });
    }
  } catch (error) {
    console.log(error);
  }
});
//Get single user details
router.get("/users/:uid", authenticate, async (req, res) => {
  const userId = req.params.uid;
  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    console.log(err);
  }
  if (!user) {
    return res.status(204).json({ status: 202, message: "User Not Found" });
  }
  res.json({ user: user.toObject({ getters: true }) });
});

// GET list of users
router.get("/user/userlist", authenticate, function (req, res) {
  User.find({}).then(function (data) {
    res.send(data);
  });
});

//Logout functionality
router.get("/user/", userController.logout);

module.exports = router;

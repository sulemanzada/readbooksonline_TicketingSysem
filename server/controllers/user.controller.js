require('../db/conn');
const User = require("../model/userSchema");

//Logout functionality
exports.logout = (req, res) =>{
    // console.log("Hello from logout page");
    res.clearCookie("jwtaaftoken", {path: '/'});
    res.status(200).send("User logout");
}

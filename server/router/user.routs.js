const jwt = require('jsonwebtoken');
const {Router} = require('express');
const bcrypt = require('bcryptjs');
const authenticate = require("../middleware/authenticate")

require('../db/conn');

const User = require("../model/userSchema");
//Require controller
var userController = require('../controllers/user.controller');
const router = Router();

router.post('/user/register', async(req, res) => {
    const {fname, lname, email, password, cpassword} = req.body;
    // console.log(fname, lname, email, password, cpassword);
    if (!fname || !lname || !email || !password || !cpassword) {
        return res.status(422).json({error: "Plz fill the field properly"});
        
    }
    try {
        const userExist = await User.findOne({email: email});
        if (userExist) {
            return res.status(422).json({status: 422, error: "Email already Exist"});
        }
        else if (password !== cpassword) {
            return res.status(422).json({error:"password do not match"});
            
        }
        else{
            const user = new User({fname, lname, email, password, cpassword });
            const userReg = await user.save();
            res.status(201).json({message: "user registered successfully"});
            // console.log(`${user} user registered sucessfully`);
            // console.log(userReg);

        }
    } catch (error) {
        console.log(error);
    }
});

router.post('/user/signin', async(req, res) => {
    try{
        const{ email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({error: "Please Fill the data properly"});
    
        }
        const userLogin = await User.findOne({email:email});
        if(userLogin){
            const isMatch = await  bcrypt.compare(password, userLogin.password);
            // Generating Token
            const token = await userLogin.generateAuthToken();
            // console.log(token);
            //Generating/Storing Cookies
            
            res.cookie("jwtaaftoken", token,{
                //Expires cookies after 30days (2589200000 milisec)
                // expires: '1d',
                httpOnly:true
            });
    
            
            if (isMatch) {
                res.json({message: "User Sign in Successfully"});
            }
        }else{
            res.status(400).json({error: "Invalid Credientials"});
        }
    
    }catch(err){
    console.log(err);
    }
    });
// create employee, same logic as create account/ register
router.post('/user/create', async(req, res) => {
    const {fname, lname, email, role, password, cpassword} = req.body;
    // console.log(fname, lname, email, password, cpassword);
    if (!fname || !lname || !email || !password || !cpassword) {
        return res.status(422).json({error: "Plz fill the field properly"});
        
    }
    try {
        const userExist = await User.findOne({email: email});
        if (userExist) {
            return res.status(422).json({status: 422, error: "Email already Exist"});
        }
        else if (password !== cpassword) {
            return res.status(422).json({error:"password do not match"});
            
        }
        else{
            const user = new User({fname, lname, email, role, password, cpassword });
            const userReg = await user.save();
            res.status(201).json({message: "Employee registered successfully"});
            // console.log(`${user} user registered sucessfully`);
            // console.log(userReg);

        }
    } catch (error) {
        console.log(error);
    }
});
router.delete('/user/deleteOne', async(req, res) => {
    const {emailLow} = req.body;
    if (!emailLow) {
        return res.status(422).json({error: "Plz fill the field properly"});
        
    }
    try {
        const userExist = await User.findOne({email: emailLow});
        if (userExist) {
            await User.deleteOne({ _id: userExist._id });
            
            return res.status(201).json({status: 201, message: "User Deleted"});
        }
        else{
            res.status(412).json({message: "Could not delete the employee maybe it doesnt exists"});
            // console.log(`${user} user registered sucessfully`);
            // console.log(userReg);

        }
    } catch (error) {
        console.log(error);
    }
    

});



//Logout functionality
router.get('/user/', userController.logout);

  // GET list of users
router.get('/user/userlist' ,authenticate, function (req , res) {
    User.find({}).then(function (data) {
    res.send(data);
    });
});



module.exports = router;
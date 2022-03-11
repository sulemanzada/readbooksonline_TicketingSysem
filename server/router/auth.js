const jwt = require('jsonwebtoken');
const {Router} = require('express');
const bcrypt = require('bcryptjs');
const authenticate = require("../middleware/authenticate")

require('../db/conn');
const User = require("../model/userSchema");

// router.get('/', (req, res) => {
//     res.send(`Hello world from the server rotuer js`);
// });
const router = Router();
router.post('/register', async(req, res) => {
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

router.post('/signin', async(req, res) => {
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
            expires: new Date(Date.now() + 2589200000),
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

router.get('/about', authenticate, (req, res) => {
    console.log("Hello From About");
    res.send(req.rootUser);
});

//Logout functionality

router.get('/logout', (req, res) =>{
    console.log("Hello from logout page");
    res.clearCookie("jwtaaftoken", {path: '/'});
    res.status(200).send("User logout");
});


module.exports = router;
const jwt = require('jsonwebtoken');
const {Router} = require('express');
const bcrypt = require('bcryptjs');

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
            await user.save();
            res.status(201).json({message: "user registered successfully"});
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

        //Generating/Storing Cookies
        /*
        res.cookie("jwtaaftoken", token,{
            //Expires cookies after 30days (25892000000 milisec)
            expires: new Date(Date.now() + 25892000000),
            httpOnly:true
        });

        */
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



module.exports = router;
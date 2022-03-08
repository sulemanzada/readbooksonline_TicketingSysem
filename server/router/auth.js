const {Router} = require('express');
const router = Router();

require('../db/conn');
const User = require("../model/userSchema");

router.get('/', (req, res) => {
    res.send(`Hello world from the server rotuer js`);
});

router.post('/register', async(req, res) => {
    const { fname, lname, email, password, cpassword} = req.body;
    if (!fname || !lname || !email || !password || !cpassword) {
        return res.status(422).json({error: "Plz fill the field properly"});
        
    }
    try {
        const userExist = await User.findOne({email: email});
        if (userExist) {
            return res.status(422).json({error: "Email already Exist"});
        }
        else if (password !== cpassword) {
            return res.status(422).json({error:"password do not match"});
            
        }
        else{
            const user = new User({fname, lname, email, password });
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
    if(!userLogin){
        res.status(400).json({error: "user does not exists"});
    }else{
        res.json({message: "User Sign in Successfully"});
    }

}catch(err){
console.log(err);
}
});

module.exports = router;
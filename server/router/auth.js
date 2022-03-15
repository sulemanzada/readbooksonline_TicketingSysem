const jwt = require('jsonwebtoken');
const {Router} = require('express');
const bcrypt = require('bcryptjs');
const authenticate = require("../middleware/authenticate")

require('../db/conn');
const User = require("../model/userSchema");
const Book = require("../model/bookSchema");
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


router.post('/bookticket', authenticate, async(req, res) => {
    var {isbn , bookname, authname , genre, price, submitter} = req.body;
    if (!isbn ) {
        return res.status(422).json({status: 422, error: "Please Provide the ISBN"});
        
    }
    if (!bookname) { bookname = "Nobookname";}
    if (!authname) { authname = "NoAuthor";}
    if (!genre) { genre = "NoGenre";}
    if (!price) { price = 00;}
    try {
        const bookExist = await Book.findOne({isbn: isbn});
        if (bookExist) {
            return res.status(412).json({status: 412, error: "Book or ticket for the book already Exist"});
        }
        else{
            const book = new Book({isbn , bookname, authname , genre, price, submitter });
            const booktick = await book.save();
            res.status(201).json({message: "Ticket submitted successfully"});
            // console.log(`${user} user registered sucessfully`);
            // console.log(userReg);

        }
    } catch (error) {
        console.log(error);
    }
});


router.get('/about', authenticate, (req, res) => {
    console.log("Hello From About");
    res.send(req.rootUser);
});

router.get('/checkuserauth', authenticate, (req, res) => {
    res.send(req.rootUser);
});


   // GET list of users
router.get('/userlist' ,authenticate, function (req , res) {
    User.find({}).then(function (data) {
    res.send(data);
    });
   });

   router.get('/requestlist' ,authenticate, function (req , res) {
    Book.find({}).then(function (data) {
    res.send(data);
    });
   });


//Logout functionality

router.get('/logout', (req, res) =>{
    // console.log("Hello from logout page");
    res.clearCookie("jwtaaftoken", {path: '/'});
    res.status(200).send("User logout");
});


module.exports = router;
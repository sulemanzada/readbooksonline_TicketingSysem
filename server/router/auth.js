const jwt = require('jsonwebtoken');
const {Router} = require('express');
const bcrypt = require('bcryptjs');
const authenticate = require("../middleware/authenticate")

require('../db/conn');
const Book = require("../model/bookSchema");
const { bstates } = require('../model/constants');
// router.get('/', (req, res) => {
//     res.send(`Hello world from the server rotuer js`);
// });
const router = Router();

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


router.put('/bookstatusUpdate', authenticate, async(req, res) => {
    var {isbn , bookStatus} = req.body;
    if (!isbn ) {
        return res.status(422).json({status: 422, error: "Please Provide the ISBN"});
        
    }
    try {
        const bookExist = await Book.findOne({isbn: isbn});
        // console.log(bookExist);
        if (bookExist) {

            if (bookExist.bookStatus === bstates.pending) {
                bookExist.bookStatus = bookStatus;
                // const book = new Book({isbn , bookname, authname , genre, price, submitter });
                await bookExist.save();
                // console.log(bookExist);
                // console.log("status ",bookStatus);
                res.json({status: 201, message: "Status Changed successfully"});
                }
            
        }
        else{
            
            return res.status(412).json({status: 412, error: "Could not change status"});

        }
    } catch (error) {
        console.log(error);
    }
});

router.put('/book/cancel', authenticate, async(req, res) => {
    var {isbn , bookStatus} = req.body;
    if (!isbn ) {
        return res.status(422).json({status: 422, error: "Please Provide the ISBN"});
        
    }
    try {
        const bookExist = await Book.findOne({isbn: isbn});
        // console.log(bookExist);
        // console.log(req.body);
        if (bookExist) {
            if (bookExist.bookStatus === bstates.pending) {
                bookExist.bookStatus = bstates.cancel;
                await bookExist.save();            
                // console.log("from if: ",bookExist);
                // console.log("status ",bookStatus);
                return res.json({status: 201, message: "Status Changed successfully"});
            }
            
        }
        else{
            
            return res.status(412).json({status: 412, error: "Could not change status"});

        }
    } catch (error) {
        console.log(error);
    }
});

router.get('/about', authenticate, (req, res) => {
    // console.log("Hello From About");
    res.send(req.rootUser);
});

router.get('/checkuserauth', authenticate, (req, res) => {
    res.send(req.rootUser);
});


router.get('/requestlist' ,authenticate, function (req , res) {
    Book.find({}).then(function (data) {
    res.send(data);
    });
});


module.exports = router;
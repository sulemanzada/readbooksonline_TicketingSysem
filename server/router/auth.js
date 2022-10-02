const jwt = require("jsonwebtoken");
const { Router } = require("express");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const authenticate = require("../middleware/authenticate");

require("../db/conn");
const Book = require("../model/bookSchema");
const User = require("../model/userSchema");
const { bstates } = require("../model/constants");
// router.get('/', (req, res) => {
//     res.send(`Hello world from the server rotuer js`);
// });
const router = Router();

router.post("/bookticket", authenticate, async (req, res) => {
  var { isbn, bookname, authname, genre, price, submitter } = req.body;
  if (!isbn) {
    //|| !bookname || !authname || !genre || !price
    return res
      .status(422)
      .json({ status: 422, error: "Please Provide the complete details" });
  }
  if (!bookname) {
    bookname = "No Bookname Provided";
  }
  if (!authname) {
    authname = "No Author Name Provided";
  }
  if (!genre) {
    genre = "No Genre Provided";
  }
  if (!price) {
    price = 00;
  }
  if (!submitter) {
    submitter = req.rootUser._id;
  }
  let user;
  try {
    user = await User.findById(req.rootUser._id);
  } catch (err) {
    console.log(err);
  }
  if (!user) {
    const error = new HttpError("Could not find user for provided id.", 404);
    return next(error);
  }
  try {
    const bookExist = await Book.findOne({ isbn: isbn });
    if (bookExist) {
      return res.status(412).json({
        status: 412,
        error: "Book or ticket for the book already Exist",
      });
    }
    const book = new Book({
      isbn,
      bookname,
      authname,
      genre,
      price,
      submitter,
    });
    // const booktick = await book.save();
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await book.save({ session: sess });
    user.bookticket.push(book);
    await user.save({ session: sess });
    await sess.commitTransaction();

    res.status(200).json({ message: "Ticket submitted successfully" });
  } catch (error) {
    console.log(error);
  }
});

router.patch("/bookticket", authenticate, async (req, res) => {
  // console.log(req.body); Good job its working
  return res.status(200).json({ status: 200, message: "Data recieved" });
});
router.put("/bookstatusUpdate", authenticate, async (req, res) => {
  var { isbn, bookStatus } = req.body;
  if (!isbn) {
    return res
      .status(422)
      .json({ status: 422, error: "Please Provide the ISBN" });
  }
  try {
    const bookExist = await Book.findOne({ isbn: isbn });
    // console.log(bookExist);
    if (bookExist) {
      if (bookExist.bookStatus === bstates.pending) {
        bookExist.bookStatus = bookStatus;
        // const book = new Book({isbn , bookname, authname , genre, price, submitter });
        await bookExist.save();
        // console.log(bookExist);
        // console.log("status ",bookStatus);
        res.json({ status: 201, message: "Status Changed successfully" });
      } else {
        return res
          .status(412)
          .json({ status: 412, error: "Could not change status" });
      }
    } else {
      return res
        .status(412)
        .json({ status: 412, error: "Could not change status" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.put("/book/cancel", authenticate, async (req, res) => {
  var { isbn, bookStatus } = req.body;
  if (!isbn) {
    return res
      .status(422)
      .json({ status: 422, error: "Please Provide the ISBN" });
  }
  try {
    const bookExist = await Book.findOne({ isbn: isbn });
    // console.log(bookExist);
    // console.log(req.body);
    if (bookExist) {
      if (bookExist.bookStatus === bstates.pending) {
        bookExist.bookStatus = bstates.cancel;
        await bookExist.save();
        // console.log("from if: ",bookExist);
        // console.log("status ",bookStatus);
        return res.json({
          status: 201,
          message: "Status Changed successfully",
        });
      } else {
        return res
          .status(412)
          .json({ status: 412, error: "Could not change status" });
      }
    } else {
      return res
        .status(412)
        .json({ status: 412, error: "Could not change status" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/about", authenticate, (req, res) => {
  res.send(req.rootUser);
});

router.get("/checkuserauth", authenticate, (req, res) => {
  res.send(req.rootUser);
});

//Update the status of book. Not any other information
router.patch("/book/update/:bookId", authenticate, async (req, res) => {
  const updateBookId = req.params.bookId;
  const { bookStatus } = req.body;
  const uRole = req.rootUser.role;
  if (
    (bookStatus === "APPROVED" || bookStatus === "REJECT") &&
    (uRole !== "ADMIN" || uRole !== "EMPLOYEE")
  ) {
    return res.status(202).json({
      status: 202,
      message: "You are not autherized to perform this operation",
    });
  }

  try {
    const bookExist = await Book.findOne({ _id: updateBookId });
    if (bookExist && bookExist.bookStatus === "PENDING") {
      if (bookStatus === "CANCEL" && req.userID !== bookExist.submitter) {
        return res.status(202).json({
          status: 202,
          message: "You can not perform this operation",
        });
      }
      bookExist.bookStatus = bookStatus;
      await bookExist.save();
      return res.status(200).json({ status: 200, message: "Done" });
    } else {
      res.status(412).json({
        message: "Could not update the book status",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

// get details of a single book
router.get("/ticket/:bookId", authenticate, async (req, res) => {
  const bookId = req.params.bookId;
  let book;
  try {
    book = await Book.findById(bookId);
  } catch (err) {
    console.log(err);
  }
  if (!book) {
    return res.status(204).json({ status: 202, message: "Book Not Found" });
  }
  res.json({ book: book.toObject({ getters: true }) });
});

router.get("/requestlist", authenticate, function (req, res) {
  Book.find({}).then(function (data) {
    res.send(data);
  });
});

module.exports = router;

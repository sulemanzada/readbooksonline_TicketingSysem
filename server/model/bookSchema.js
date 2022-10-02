const mongoose = require("mongoose");
const {bstates} = require("./constants");
const bookSchema = new mongoose.Schema({
    isbn: {
        type: String,
        required: true
    },
    bookname: {
        type: String,
    },
    authname: {
        type: String,
    },
    genre: {
        type: String,
    },
    price:{
        type: Number,

    },
    bookStatus:{
        type: String,
        enum: [bstates.pending, bstates.approved, bstates.declined, bstates.cancel],
        default: bstates.pending
    },
    submitter: {
        type: mongoose.Types.ObjectId, required: true, ref: 'USER' 
    }
})

const Book = mongoose.model("BOOK", bookSchema);
module.exports = Book;
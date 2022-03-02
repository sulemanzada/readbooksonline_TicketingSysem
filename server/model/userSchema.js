const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    fname:{
        type: String,
        required: true
    },
    lname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password:{
        type: String,
        required: [true, 'Password is required']
    },
    cpassword:{
        type: String,
        required: [true, 'Password is required']
    },
    gender: {type: String, possibleValues: ['male','female']}
})

const User = mongoose.model('USER', userSchema);

module.exports = User;
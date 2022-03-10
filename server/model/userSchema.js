const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    tokens:[
        {
            token:{
                type: String,
                required: true
            }
        }
    ]
})


//Use of Middleware as required by the Assignment
//Hashing PASSWORD using BCRYPTJS
//For the moment I am not using it. I will use it later
/*
userSchema.pre('save', async function(next){
    if (this.isModified('password')) {
        this.password = bcrypt.hash(this.password, 12);
        this.cpassword = bcrypt.hash(this.cpassword, 12);
    }
    next();
});
*/

//Generating JWT Token for When user SignIn
/*
userSchema.methods.generateAuthToken = async function(){
    try {
        let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    } catch (err) {
        console.log(err);
    }
}
*/
const User = mongoose.model('USER', userSchema);

module.exports = User;



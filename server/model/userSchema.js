const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const uniqueValidator = require('mongoose-unique-validator');

const {roles} = require("./constants");

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
    role: {
        type: String,
        enum: [roles.admin, roles.moderator, roles.client],
        default: roles.client,
      },
    password: {
        type: String,
        required: true
    },
    bookticket: [{ type: mongoose.Types.ObjectId, required: true, ref: 'BOOK' }],
    
    tokens:[
        {
            token:{
                type: String,
                required: true
            }
        }
    ]
})


//Hashing PASSWORD using BCRYPTJS

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12  );
        if (this.email === process.env.ADMIN_EMAIL.toLowerCase()) {
            this.role = roles.admin;
          }
        
        }
    next();
});


//Generating JWT Token for When user SignIn

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

userSchema.plugin(uniqueValidator);

const User = mongoose.model('USER', userSchema);

module.exports = User;



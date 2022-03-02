// import mongoose from "mongoose";

// import mongoose = require("mongoose");
// import * as mongoose from "mongoose";
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/rboDataBase", {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(() => {
    console.log(`Connection Successfull`);
}).catch((e) => {
    console.log(`No connection`);
})
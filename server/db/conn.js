
const mongoose = require("mongoose");


/*
** The orignal password is @123Downlo but I had to convert it using percent encoding
*/
const DB = process.env.DATABASE;
mongoose.connect(DB, {
    }).then(() =>{
    console.log(`DB Connection Successful`);

}).catch((err) => console.log(err));



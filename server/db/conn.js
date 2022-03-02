const mongoose = require("mongoose");


/*
** The orignal password is @123Downlo but I had to convert it using percent encoding
*/
const DB = 'mongodb+srv://charles:%40123Downlow@cluster0.7jfzk.mongodb.net/readbooksonline?retryWrites=true&w=majority'

mongoose.connect(DB, {
    }).then(() =>{
    console.log(`DB Connection Successful`);

}).catch((err) => console.log(err));



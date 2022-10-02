const dotenv = require("dotenv");
const express = require("express");
const cookieParser = require('cookie-parser');
const app = express();
dotenv.config({path:"./config.env"});
require('./db/conn');
const User = require('./model/userSchema');
app.use(cookieParser());
app.use(express.json());
app.use(require("./router/auth"));
app.use(require("./router/user.routs"));
const PORT = process.env.PORT;

app.get('/', (req, res) => {
res.send(`Hello from server`);
})
// var chatSocket = require('socket.io')(
//     {
//         cors: {
//             origins: ['http://localhost:8000']
//         }
//     }
// );
// Importing the chat controller
// var chatController = require('./controllers/chat.controller');

// var chat = chatSocket
//   .of('/chat') //We are defining an endpoint for the chat
//   .on('connection', function (socket) {
//       chatController.respond(chat,socket);
//   });


app.listen(PORT, ()=>{})

// module.exports = { app, chatSocket };

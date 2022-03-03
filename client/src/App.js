// import { application } from 'express';
import './App.css';
import MultipleInputs from './component/forms/multipleInputs';
import Navbar from './component/Navbar';
// we link the router files to make our route easy 
// App.use(require('./server/router/auth'));
// require("./db/conn");
// const express = require("express");
// const App = express();

// App.get("/", (req, res) => {
//   res.send("test suleman")
// });

// App.listen(3000)

function App() {
  return (
    <>
      <Navbar></Navbar>
    </>
  );
}

export default App;

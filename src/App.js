// import { application } from 'express';
import './App.css';
import MultipleInputs from './component/forms/multipleInputs';
// require("./db/conn");
// const express = require("express");
// const App = express();

// App.get("/", (req, res) => {
//   res.send("test suleman")
// });

// App.listen(3000)

function App() {
  return (
    <div >
     <MultipleInputs/>
    </div>
  );
}

export default App;

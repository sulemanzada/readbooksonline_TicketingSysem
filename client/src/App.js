// import { application } from 'express';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import MultipleInputs from './component/forms/multipleInputs';
import Navbar from './component/Navbar';
import Home from './component/Home';
import Login from './component/Login';
import Signup from './component/Signup';
import Aboutus from './component/Aboutus';
import NoPage from './component/NoPage';

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
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="Aboutus" element={<Aboutus />} />
          <Route path="signup" element={<Signup />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
      {/* <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />}>

        </Route>
      </Routes>
      <Routes>
        <Route path="Aboutus" element={<Aboutus />}>
        </Route>
      </Routes> */}
      {/* <Route exact path='/'>
        <Home />
      </Route>

      <Route path='/Aboutus'>
        <Aboutus />
      </Route>

      <Route path='/Signup'>
        <Signup />
      </Route>

      <Route path='/Login'>
        <Login />
      </Route> */}
    </>
  );
}

export default App;

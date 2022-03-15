import React, { createContext, useReducer } from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Navbar from './component/Navbar';
import Home from './component/Home';
import Login from './component/Login';
import Signup from './component/Signup';
import Aboutus from './component/Aboutus';
import NoPage from './component/NoPage';
import Logout from './component/Logout';
import Ticket from './component/Ticket';
import DeleteUsers from './component/DeleteUsers';
import Requests from './component/Requests';
import RequestClass from './component/RequestClass';
import RequestList from './component/RequestList';
import CreateEmployee from './component/CreateEmployee';

import { initialState, reducer } from './reducer/Usereducer';

//Conext API
export const UserContext = createContext();
const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <>
    <UserContext.Provider value={{state, dispatch}}>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="Aboutus" element={<Aboutus />} />
          <Route path="signup" element={<Signup />} />
          <Route path="logout" element= {<Logout/>}/>
          <Route path="Ticket" element= {<Ticket/>}/>
          <Route path="DeleteUsers" element= {<DeleteUsers/>}/>
          <Route path="Requests" element= {<Requests/>}/>
          <Route path="RequestClass" element= {<RequestClass/>}/>
          <Route path="RequestList" element= {<RequestList/>}/>
          <Route path="CreateEmployee" element= {<CreateEmployee/>}/>
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;

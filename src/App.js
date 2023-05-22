import React from "react";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Home from "./Components/Home";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UpdateProfileForm from "./Components/updateProfile";
import Logout from "./Components/Logout";

const App = () => {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/update/:id' element={<UpdateProfileForm />} />
          <Route path='/logout' element={<Logout />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

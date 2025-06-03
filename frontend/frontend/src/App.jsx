// A state is used to store property values that belong to the component
// When the state object changes (data), the component re-renders
import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ViewApplications } from './pages/ViewApplications';


function App() {


  return (
    <>
      <BrowserRouter>
        {/* Main Routes */}
        <Routes>
          <Route index element={<Home />}/>
          <Route path='login' element={<Login />}/>
          <Route path='register' element={<Register />}/>
          <Route path='view-applications' element={<ViewApplications />} />
          <Route path='*' element={<NotFound />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App

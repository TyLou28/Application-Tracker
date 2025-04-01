// A state is used to store property values that belong to the component
// When the state object changes (data), the component re-renders
import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Layout from './pages/Layout';


function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout/>}>
      <Route index element={<Home/>}/>
      <Route path='register' element={<Register/>}/>
      <Route path='login' element={<Login/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App

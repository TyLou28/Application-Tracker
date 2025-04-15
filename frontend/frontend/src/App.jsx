// A state is used to store property values that belong to the component
// When the state object changes (data), the component re-renders
import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import './App.css'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Layout from './pages/Layout';
import NewEntry from './pages/NewEntry';


function App() {

  const [first_name, setFirstName] = useState("")
  const [isLoggedIn, setLoggedIn] = useState(false)


  useEffect(() => {
      checkLoggedIn();
  }, []);

    const checkLoggedIn = async () => {
      try {
          const token = localStorage.getItem("accessToken");

          if (token) {
              const response = await fetch("http://localhost:8000/user", {
                  method: "GET",
                  headers: {
                      "Authorization": `Bearer ${token}`,
                      "Content-Type": "application/json"
                  }
              });

              if (!response.ok) {
                  throw new Error("Failed to authenticate user");
              }

              const data = await response.json();
              setLoggedIn(true);
              setFirstName(data.first_name); // Correctly accessing first name
          } else {
              setLoggedIn(false);
              setFirstName("");
          }
      } catch (err) {
          console.error("Error:", err);
          setLoggedIn(false);
          setFirstName("");
      }
  };

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        await fetch("http://localhost:8000/users/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refresh: refreshToken }),
        });
      }

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      setLoggedIn(false)
      setFirstName("")
      window.location.reload()

    }catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <BrowserRouter>
      {/* Main Routes */}
      <Routes>
        <Route path='/' element={
          <Layout
            isLoggedIn={isLoggedIn}
            first_name={first_name}
            handleLogout={handleLogout} />}>
          <Route index element={<Home />} />
          <Route path='register' element={<Register />} />
          <Route path='login' element={<Login />} />
          <Route path='new-entry' element={<NewEntry />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App

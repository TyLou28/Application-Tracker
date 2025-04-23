import React from "react";
import { Outlet, Link } from "react-router-dom";
import '../styles/navbar.css'

export default function Layout({ isLoggedIn, first_name, handleLogout }) {
    return (
        <>
            {/* Navigation Section */}
            <header className='navbar'>
                <nav>
                    <div className="nav-left">
                        <Link to="/">Home</Link>
                    </div>
                    <div className="nav-right">
                        {isLoggedIn ? (
                            <>
                                <span>Hi, {first_name} |</span>
                                <Link to="/track-applications">Track Applications</Link>
                                <Link to="/new-entry">Add Application</Link>
                                <span>|</span>
                                <button onClick={handleLogout}>Logout</button>
                            </> 
                            ) : (
                            <>
                                <Link to="/register">Sign Up</Link>
                                <span>|</span>
                                <Link to="/login">Login</Link>
                            </>
                        )}
                    </div>
                </nav>
            </header>
            <main>
                <Outlet/>
            </main>
        </>
    )
}
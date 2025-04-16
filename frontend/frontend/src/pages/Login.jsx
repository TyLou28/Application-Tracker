import React, { use, useState } from "react";
import '../styles/login.css'

export default function Login() {

        const [formData, setFormData] = useState({
            email: "",
            password: "",
        });

        const [isLoading, setIsLoading] = useState(false);
        const [successMsg, setSuccessMsg] = useState(null);
        const [error, setError] = useState(null);

        
    const loginUser = async (e) => {
        e.preventDefault();
        if(isLoading) {
            return
        }
        const userData = { ...formData };
        setIsLoading(true);
        setError(null);
        try {
            const response =  await fetch("http://localhost:8000/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData),
            });
            const data = await response.json();

            if(!response.ok) {
                setError(data);
                throw new Error("Login Failed");
            }

            localStorage.setItem("accessToken", data.tokens.access);
            localStorage.setItem("refreshToken", data.tokens.refresh);

            setSuccessMsg("Login Successful");
            setFormData({
                email: "",
                password: "",
            });
            window.location.href = "/"

        } catch (error) {
            console.error("Error: ", error);
        } finally {
            setIsLoading(false);
        }

    };

    return (
        <div className="form-container">
            <div className="form-wrapper">
                {error && (
                    <div className="errormsg">
                        {Object.keys(error).map((field, index) => (
                            <p key={index}>{error[field].join(", ")}</p>
                        ))}
                    </div>
                )}

                {successMsg && <p>{successMsg}</p>}
                <header className="form-head">
                    <h2> Sign into your account here </h2>
                </header>
                <form>
                    <div className="email-form">
                    <label>Email:</label>
                        <input type="email" name="email" value={formData.email}
                        placeholder="Email..."
                        onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}></input>
                    </div>
                    <div className="password-form">
                        <label>Password:</label>
                        <input type="password" name="password" value={formData.password}
                        placeholder="Password..."
                        onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}></input>
                    </div>

                    <button type="submit" disabled={isLoading} onClick={loginUser}>Login</button>
                </form>
            </div>
        </div>
    )
}
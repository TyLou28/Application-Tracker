import React, { use, useState } from "react";

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
        <div>
            {error && (
                <div style={{ color: "red" }}>
                    {Object.keys(error).map((field, index) => (
                        <p key={index}>{error[field].join(", ")}</p>
                    ))}
                </div>
            )}

            {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}
            <h2> Login </h2>
            <form>
                <label>Email:</label><br/>
                <input type="email" name="email" value={formData.email}
                placeholder="Email..."
                onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}></input><br />
                <label>Password:</label><br/>
                <input type="password" name="password" value={formData.password}
                placeholder="Password..."
                onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}></input><br />
                <br />
                <button type="submit" disabled={isLoading} onClick={loginUser}>Login</button><br />
            </form>
        </div>
    )
}
import React, { use, useState } from "react";

export default function Register() {

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password1: "",
        password2: "",
    });

    const [isLoading, setIsLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const registerUser = async (e) => {
        e.preventDefault();
        if(isLoading) {
            return
        }
        const userData = { ...formData };
        setIsLoading(true);
        try {
            const response =  await fetch("http://localhost:8000/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData),
            });
            const data = await response.json();
            setFormData({
                first_name: "",
                last_name: "",
                email: "",
                password1: "",
                password2: "",
            });
            setSuccessMsg("Registration Successful")
        } catch (err) {
            console.log(err)
        }

    };

    return (
        <div>
            <h2> Register </h2>
            <form>
                <label>First Name:</label><br/>
                <input type="text" name="first_name" value={formData.first_name}
                placeholder="First name..."
                onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}></input><br />
                <label>Last Name:</label><br/>
                <input type="text" name="last_name" value={formData.last_name}
                placeholder="Last Name..."
                onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}></input><br />
                <label>Email:</label><br/>
                <input type="email" name="email" value={formData.email}
                placeholder="Email..."
                onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}></input><br />
                <label>Password:</label><br/>
                <input type="password" name="password1" value={formData.password1}
                placeholder="Password..."
                onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}></input><br />
                <label>Confirm Password:</label><br/>
                <input type="password" name="password2" value={formData.password2}
                placeholder="Re-Enter Password..."
                onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}></input><br />
                <br />
                <button type="submit" disabled={isLoading} onClick={registerUser}>Register</button><br />
            </form>
        </div>
    )
}
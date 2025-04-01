import React, { use, useState } from "react";

export default function Register() {

    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password1: "",
        password2: "",
    });
    return (
        <div>
            <h2> Register </h2>
            <form>
                <label>First Name:</label><br/>
                <input type="text" name="first_name" value={formData.first_name}
                onChange={(e) => setFormData(e.target.value)}></input><br />
                <label>Last Name:</label><br/>
                <input type="text" name="last_name" value={formData.last_name}
                onChange={(e) => setFormData(e.target.value)}></input><br />
                <label>Email:</label><br/>
                <input type="email" name="email" value={formData.email}
                onChange={(e) => setFormData(e.target.value)}></input><br />
                <label>Password:</label><br/>
                <input type="password" name="password1" value={formData.password1}
                onChange={(e) => setFormData(e.target.value)}></input><br />
                <label>Confirm Password:</label><br/>
                <input type="password" name="password2" value={formData.password2}
                onChange={(e) => setFormData(e.target.value)}></input><br />
                <br />
                <button type="submit" disabled={isLoading}>Register</button><br />
            </form>
        </div>
    )
}
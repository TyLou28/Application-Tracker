import React, { useState } from "react";
import '../App.css'

export default function NewEntry() {
    const [applications, setApplications] = useState([]);
    const [company, setCompany] = useState("")
    const [role, setRole] = useState("")
    const [location, setLocation] = useState("")
    const [salary, setSalary] = useState("")
    const [status, setStatus] = useState("")
    const [applied_date, setApplied_date] = useState("")

    // Used to add the data with post request to the endpoint 
    const addApplication = async () => {
        const token = localStorage.getItem("accessToken");  // Retrieve stored token
    
        const appData = {
            company,
            role,
            location,
            salary,
            status,
            applied_date,
        };
    
        try {
            const response = await fetch("http://localhost:8000/applications/create_application", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`  // Include the auth token
                },
                body: JSON.stringify(appData),
            });
    
            if (!response.ok) {
                const errorData = await response.json(); // Get detailed error message from backend
                console.error("Error from backend:", errorData);
                throw new Error("Failed to add application");
            }
    
            const data = await response.json();
    
            // Update UI with new application
            setApplications((prev) => [...prev, data]);
    
            // Clear form fields
            setCompany('');
            setRole('');
            setLocation('');
            setSalary('');
            setStatus('');
            window.location.href = "/"
        } catch (err) {
            console.error("Error:", err);
        }
    };

    return (
        <>
        
        <h1>Add a new application</h1>

        <div className="new-app-input">
                <input type="text"
                value={company}
                placeholder='Company Name...'
                onChange={(e) => setCompany(e.target.value)} />
                <input type="text"
                value={role}
                placeholder='Role Name...'
                onChange={(e) => setRole(e.target.value)} />
                <input type="text"
                value={location}
                placeholder='Name of Location...'
                onChange={(e) => setLocation(e.target.value)} />
                <input type="text"
                value={salary}
                placeholder='Salary...'
                onChange={(e) => setSalary(e.target.value)} />
                <input type="text"
                value={status}
                placeholder='Status...'
                onChange={(e) => setStatus(e.target.value)} />
                <br /> <br />
                <button onClick={addApplication}>Add Application</button>
            </div>

        </>
    )
}
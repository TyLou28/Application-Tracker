import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../App.css'
import '../styles/home.css'

export default function Home({ isLoggedIn, first_name }) {
    // State to hold application data and function to alter data(setApplications)
    const [applications, setApplications] = useState([]);
    const [newStatus, setNewStatus] = useState("");
    const [statusError, setStatusError] = useState({});

    useEffect(() => {
        fetchApplications();
    }, []);

    // Used to fetch the data related to the applications
    const fetchApplications = async () => {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await fetch("http://localhost:8000/user-applications", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,  // Include token in request
                    "Content-Type": "application/json",
                },
            });
    
            if (!response.ok) {
                throw new Error("Failed to fetch applications");
            }
    
            const data = await response.json();
            setApplications(data);  // Set the state with the filtered applications
        } catch (err) {
            console.error("Error:", err);
        }
    }

    // Function to update the status specifically
    // We pass in the primary key to update the specific application
    // We also pass in the other elements we dont want to update
    const updateStatus = async (pk, company, role, location, salary) => {
        const appData = {
        company,
        role,
        location,
        salary,
        // Set status to new status
        status: newStatus,
        };
        try {
        const response = await fetch(`http://localhost:8000/applications/${pk}`, {
            method: "PUT",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(appData),
        });
        const data = await response.json();

        if (!response.ok) {
            setStatusError((prev) => ({
                ...prev,
                [pk]: data.status || data.detail || "Unknown Error",
            }));
            return;
        }

        setStatusError((prev) => ({
            ...prev,
            [pk]: null,
          }));

        // Loop through all of the applications
        // If the job id matches the pk, return the new data
        // Otherwise, return the current application
        setApplications((prev) => 
            prev.map((job) => {
            if (job.id === pk) {
                return data;
            } else {
                return job;
            }
            })
        );
        setNewStatus('');
        } catch (err) {
        console.log(err)
        setStatusError((prev) => ({
            ...prev,
            [pk]: "Something went wrong"
          }));
        }
    }

    const deleteApplication = async (pk) => {
        try {
        const response = await fetch(`http://localhost:8000/applications/${pk}`, {
            method: "DELETE",
        });

        setApplications((prev) => prev.filter((application) => application.id !== pk));
        } catch (err) {
        console.log(err)
        }
    }

    return (
        <section className="home-hero">  
            <div className="about-app flex">
                <p>The Application Tracker</p>
                <h2>Efficiently Track & Organise <br /> Your Applications</h2>
                <h1>Made for students and graduates alike</h1>
                {isLoggedIn ? (
                    <div className="about-user-in">
                        <p>Welcome Back, {first_name}!</p>
                        <Link to="/track-applications"><button>View Your Applications</button></Link>
                    </div>
                ) : (
                    <div className="about-user-out">
                        <Link to="/register"><button>Sign Up</button></Link>
                    </div>
                )}
            </div>
            <div className="about-image">
            </div> 
        </section>
    );
}


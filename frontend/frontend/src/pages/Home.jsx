import React, { useEffect, useState } from "react";
import '../App.css'
import '../styles/home.css'

export default function Home() {
    // State to hold application data and function to alter data(setApplications)
    const [applications, setApplications] = useState([]);
    const [company, setCompany] = useState("")
    const [role, setRole] = useState("")
    const [location, setLocation] = useState("")
    const [salary, setSalary] = useState("")
    const [status, setStatus] = useState("")
    const [applied_date, setApplied_date] = useState("")

    const [newStatus, setNewStatus] = useState("")


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
        <>  
            <div className="container">
                <h1>Your Application Tracker</h1>
                <div className="app-table">
                    <table className='application_table'>
                        <thead>
                        <tr>
                            <th>Company</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Applied Date</th>
                            <th>Edit Application</th>
                        </tr>
                        </thead>
                        <tbody>
                        {applications.length > 0 ? (
                            applications.map((job) => (
                            <tr className='active-row' key={job.id}>
                                <td>{job.company}</td>
                                <td>{job.role}</td>
                                <td>{job.status}</td>
                                <td>{job.applied_date}</td>
                                <td>
                                <input type="text"
                                value={newStatus}
                                placeholder='Change status...'
                                onChange={(e) => setNewStatus(e.target.value)}/>
                                <button onClick={() => updateStatus(job.id, job.company, job.role, job.location, job.salary)}>Change Status</button>
                                <button onClick={() => deleteApplication(job.id)}> Delete Appplication</button>
                                </td>
                            </tr>
                            ))
                        ) : (
                            <tr>
                            <td colSpan="5" style={{ textAlign: 'center', padding: '10px', color: '#009879'}}>
                                You have no current active applications
                            </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}


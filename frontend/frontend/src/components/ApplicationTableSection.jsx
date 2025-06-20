import { Edit, Trash2 } from "lucide-react";
import { useEffect, useState } from "react"

export const ApplicationTableSection = () => {
    const [applications, setApplications] = useState([]);
    const [newStatus, setNewStatus] = useState("");
    const [statusError, setStatusError] = useState({});

    useEffect(() => {
        fetchApplications();
    }, []);

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

            if(!response.ok) {
                throw new Error("Failed to get applications")
            }
            const data = await response.json();
            setApplications(data)
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
        <section className="py-24 px-4 relative bg-secondary/30">
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center opacity-0 animate-fade-in-delay-1">
                    View Your <span className="text-primary">Applications</span>
                </h2>

                <div className="bg-card opacity-0 p-8 rounded-lg shadow-xs animate-fade-in-delay-2">
                    <h2 className="text-2xl mb-6 font-semibold">
                        Current Active Applications
                    </h2>

                    <table className="w-full text-center table-auto min-w-max">
                        <thead>
                            <tr>
                                <th className="p-4 border-b border-primary">
                                    <h4 className="font-semibold">
                                    Role</h4>
                                </th>
                                <th className="p-4 border-b border-primary">
                                    <h4 className="font-semibold">
                                    Company</h4>
                                </th>
                                <th className="p-4 border-b border-primary">
                                    <h4 className="font-semibold">
                                    Salary</h4>
                                </th>
                                <th className="p-4 border-b border-primary">
                                    <h4 className="font-semibold">
                                    Applied Date</h4>
                                </th>
                                <th className="p-4 border-b border-primary">
                                    <h4 className="font-semibold">
                                    Status</h4>
                                </th>
                                <th className="p-4 border-b border-primary">
                                    <h4 className="font-semibold">
                                        Options
                                    </h4>
                                </th>
                            </tr>
                        </thead>
                        {applications.length > 0 ? (
                            applications.map((job) => (
                                <tbody>
                                    <tr className="mt-4" key={job.id}>
                                        <td>{job.role}</td>
                                        <td>{job.company}</td>
                                        <td>{job.salary}</td>
                                        <td>{job.applied_date}</td>
                                        <td>{job.status}</td>
                                        <div className="flex justify-center space-x-4 mt-4">
                                            <Trash2 onClick={() => deleteApplication(job.id)} className="text-primary cursor-pointer" />
                                            <Edit className="text-primary cursor-pointer" />
                                        </div>
                                    </tr>
                                </tbody>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="p-6 text-2xl text-semibold text-primary text-center">
                                    You have no active applications, Add an application below
                                </td>
                            </tr>
                        )}
                    </table>
                </div>
            </div>
        </section>
    )
}
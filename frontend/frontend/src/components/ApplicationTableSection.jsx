import { useEffect, useState } from "react"

export const ApplicationTableSection = () => {
    const [applications, setApplications] = useState([]);
    const [newStatus, setNewStatus] = useState("");
    const [statusError, setStatusError] = useState({});

    useEffect(() => {

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

                    <table className="w-full text-left table-auto min-w-max">
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
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.length > 0 ? (
                                applications.map((job) => (
                                    <tr className="" key={job.id}>
                                        <td>{job.role}</td>
                                        <td>{job.company}</td>
                                        <td>{job.salary}</td>
                                        <td>{job.applied_date}</td>
                                        <td>{job.status}</td>
                                    </tr>
                                ))
                            ) : (
                                <h5 className="text-center text-primary">
                                    You have no active applications
                                </h5>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}
import { Edit, Trash2 } from "lucide-react";
import { useEffect, useState } from "react"

export const ApplicationTableSection = () => {
    const [applications, setApplications] = useState([]);
    const [newStatus, setNewStatus] = useState("");
    const [statusError, setStatusError] = useState({});
    const [editingId, setEditingId] = useState(null);
    const [customStatus, setCustomStatus] = useState("")

    const statusOptions = [
        ['applied', 'Applied'],
        ['video interview', 'Video Interview'],
        ['phone screen', 'Phone Screen'],
        ['online assessment', 'Online Assessment'],
        ['assessment centre', 'Assessment Centre'],
        ['first interview', 'First Interview'],
        ['second interview', 'Second Interview'],
        ['third interview', 'Third Interview'],
        ['fourth interview', 'Fourth Interview'],
        ['fifth interview', 'Fifth Interview'],
        ['offer', 'Offer'],
        ['rejected', 'Rejected'],
        ['other', 'Other'],
      ];

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

    const updateStatus = async (pk, company, role, location, salary) => {
        const status = newStatus === "other" ? customStatus : newStatus;
        const appData = {
        company,
        role,
        location,
        salary,
        // Set status to new status
        status: status,
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
        setCustomStatus('');
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
                                    <tr key={job.id}>
                                        <td className="p-4 border-b">{job.role}</td>
                                        <td className="p-4 border-b">{job.company}</td>
                                        <td className="p-4 border-b">{job.salary}</td>
                                        <td className="p-4 border-b">{job.applied_date}</td>
                                        
                                        <td className="p-4 border-b">
                                            {editingId === job.id ? (
                                                <div className="flex flex-col gap-2">
                                                    <select
                                                        id="status"
                                                        value={newStatus}
                                                        required
                                                        onChange={(e) => {
                                                            const selected = e.target.value
                                                            setNewStatus(selected)
                                                            if (selected !== "other") setCustomStatus('');
                                                        }}
                                                        className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary">
                                                        <option value="" disabled>Select application status</option>
                                                        {statusOptions.map(([value, label]) => (
                                                            <option key={value} value={value}>{label}</option>
                                                        ))}                                                       
                                                    </select>

                                                    {newStatus === "other" && (
                                                        <input
                                                        type="text"
                                                        required
                                                        value={customStatus}
                                                        placeholder="Enter custom status..."
                                                        className="mt-4 w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                                                        onChange={(e) => setCustomStatus(e.target.value)}
                                                        />
                                                    )}
                                                </div>


                                            ) : (
                                                job.status
                                            )}
                                            {statusError[job.id] && (
                                                <p className="text-red-500 text-sm mt-1">{statusError[job.id]}</p>
                                            )}
                                        </td>

                                        <td className="p-4 border-b">
                                            <div className="flex items-center justify-center gap-4">
                                                <Trash2
                                                    onClick={() => deleteApplication(job.id)}
                                                    className="text-primary cursor-pointer"
                                                />
                                                {editingId === job.id ? (
                                                    <button
                                                        onClick={() => {
                                                            updateStatus(job.id, job.company, job.role, job.location, job.salary);
                                                            setEditingId(null);
                                                        }}
                                                        className="button-one text-sm px-3 py-1"
                                                    >
                                                        Submit
                                                    </button>
                                                ) : (
                                                    <Edit
                                                        onClick={() => {
                                                            setEditingId(job.id);
                                                            setNewStatus(job.status);
                                                            setCustomStatus('');
                                                        }}
                                                        className="text-primary cursor-pointer"
                                                    />
                                                )}
                                            </div>
                                        </td>
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
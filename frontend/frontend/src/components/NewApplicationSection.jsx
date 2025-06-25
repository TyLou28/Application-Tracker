import React, { useState } from "react"
import { cn } from "@/lib/utils.js"
import { LoaderPinwheel, StickyNote } from "lucide-react";
export const NewApplicationSection = () => {
    const [applications, setApplications] = useState([]);
    const [company, setCompany] = useState("")
    const [role, setRole] = useState("")
    const [location, setLocation] = useState("")
    const [salary, setSalary] = useState("")
    const [status, setStatus] = useState("")
    const [customStatus, setCustomStatus] = useState("")
    const [applied_date, setApplied_date] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

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

    const addApplication = async (e) => {
        e.preventDefault();
        if(isSubmitting) {
            return
        }
        const token = localStorage.getItem("accessToken");  // Retrieve stored token
        const statuss = status === "other" ? customStatus : status;
    
        const appData = {
            company,
            role,
            location,
            salary,
            status: statuss,
            applied_date,
        };
        setIsSubmitting(true)
    
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
            setCustomStatus('');
            window.location.href = "view-applications"
        } catch (err) {
            console.error("Error:", err);
        } finally {
            setIsSubmitting(false)
        }
    };

    return (
        <section className="py-24 px-4 relative bg-secondary/30">
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center opacity-0 animate-fade-in-delay-1">
                    Applied to a job? <span className="text-primary">Add it Below</span>
                </h2>

                <div className="bg-card opacity-0 p-8 rounded-2xl shadow-xs animate-fade-in-delay-1">
                    <h4 className="text-2xl font-semibold mb-10">Add a new application</h4>

                    <form className="space-y-6" onSubmit={addApplication}>
                        <div>
                            <label htmlFor="role" className="block text-sm font-medium mb-1">Role</label>
                            <input type="text" id="role" required value={role} placeholder="Name of Role..."
                            className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary"
                            onChange={(e) => setRole(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="company" className="block text-sm font-medium mb-1">Company</label>
                            <input type="text" id="company" required value={company} placeholder="Name of Company..."
                            className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary"
                            onChange={(e) => setCompany(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="salary" className="block text-sm font-medium mb-1">Salary</label>
                            <input type="text" id="salary" required value={salary} placeholder="Salary of Role..."
                            className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary"
                            onChange={(e) => setSalary(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="location" className="block text-sm font-medium mb-1">Location</label>
                            <input type="text" id="location" required value={location} placeholder="Location of Role..."
                            className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary"
                            onChange={(e) => setLocation(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="status" className="block text-sm font-medium mb-1">Status</label>
                            <select
                             id="status"
                             value={status}
                             required
                             onChange={(e) => {
                                const selected = e.target.value
                                setStatus(selected)
                                if (selected !== "other") setCustomStatus('');
                             }}
                             className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary">
                                <option value="" disabled>Select application status</option>
                                {statusOptions.map(([value, label]) => (
                                    <option key={value} value={value}>{label}</option>
                                ))}
                             </select>

                             {status === "other" && (
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
                        <button disabled={isSubmitting} type="submit" className={cn("button-one w-full flex items-center justify-center gap-2 mt-12 cursor-pointer")}>
                            {isSubmitting ? <LoaderPinwheel /> : <StickyNote />}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}
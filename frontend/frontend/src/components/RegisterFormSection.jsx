import { useState } from "react";
import { cn } from "@/lib/utils.js"
import { LoaderPinwheel, FileUser } from "lucide-react";

export const RegisterFormSection = () => {

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [successMsg, setSuccessMsg] = useState(null);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password1: "",
        password2: "",
    })

    const registerUser = async (e) => {
        e.preventDefault();
        if(isSubmitting) {
            return
        }
        const userData = { ...formData };
        setIsSubmitting(true);
        try {
            const response =  await fetch("http://localhost:8000/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData),
            });
            const data = await response.json();

            if(!response.ok) {
                setError(data);
                throw new Error("Registration Failed");
            }

            setSuccessMsg("Registration Successful");
            setFormData({
                first_name: "",
                last_name: "",
                email: "",
                password1: "",
                password2: "",
            });
            window.location.href = "/login"

        } catch (error) {
            console.error("Error: ", error);
        } finally {
            setIsSubmitting(false);
        }

    };

    return (
        <section className="py-24 px-4 relative bg-secondary/30">
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center opacity-0 animate-fade-in-delay-1">
                    New Here, 
                    <span className="text-primary animate-fade-in-dely-1"> Sign Up Now</span>
                </h2>

                <div className="bg-card opacity-0 p-8 rounded-lg shadow-xs animate-fade-in-delay-2">
                    <h2 className="text-2xl font-semibold mb-8">Register</h2>

                    <form className="space-y-6" onSubmit={registerUser}>
                            <div>
                                <label htmlFor="first_name" className="block text-sm font-medium mb-2">First Name</label>
                                <input type="text" id="first_name" name="first_name" required  value={formData.first_name}
                                className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary"
                                placeholder="Your First Name..."
                                onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}/>
                            </div>
                            <div>
                                <label htmlFor="last_name" className="block text-sm font-medium mb-2">Last Name</label>
                                <input type="text" id="last_name" name="last_name" required  value={formData.last_name}
                                className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary"
                                placeholder="Your Last Name..."
                                onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}/>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                                <input type="email" id="email" name="email" required  value={formData.email}
                                className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary"
                                placeholder="Your Email..."
                                onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}/>
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
                                <input type="text" id="password" name="password1" required value={formData.password1}
                                className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary"
                                placeholder="Password..."
                                onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}/>
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium mb-2">Confrim Password</label>
                                <input type="text" id="password" name="password2" required value={formData.password2}
                                className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary"
                                placeholder="Retype Password..."
                                onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}/>
                            </div>

                            <button disabled={isSubmitting} type="submit" className={cn("button-one w-full flex items-center justify-center gap-2 mt-12 cursor-pointer")}>
                            {isSubmitting ? <LoaderPinwheel /> : <FileUser size={25}/>}
                            </button>

                    </form>
                </div>
            </div>
        </section>
    )
}
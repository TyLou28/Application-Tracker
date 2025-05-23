import { cn } from "@/lib/utils.js"
import { LoaderPinwheel, LogIn } from "lucide-react";
import { useState } from "react"

export const LoginFormSection = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [successMsg, setSuccessMsg] = useState(null);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    
    const loginUser = async (e) => {
        e.preventDefault();
        if (isSubmitting) {
            return
        }
        const userData = { ...formData }
        setIsSubmitting(true)
        setError(null)
        try {
            const response = await fetch("http://localhost:8000/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData),
            });
            const data = await response.json()
            if(!response.ok) {
                setError(data)
                throw new Error("Login failed", data)
            }

            localStorage.setItem("accessToken", data.tokens.access)
            localStorage.setItem("refreshToken", data.tokens.refresh)
            setSuccessMsg("Login Successful");
            setFormData({
                email: "",
                password: "",
            });
            window.location.href = "/"
        } catch (error) {
            console.error(error)
        } finally {
            setIsSubmitting(false)
        }

    }

    return (
        <section className="py-24 px-4 relative bg-secondary/30">
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-3x; md:text-4xl font-bold mb-16 text-center text-primary opacity-0 animate-fade-in-delay-1">
                    Have an account, Sign in here
                </h2>

                <div className="bg-card opacity-0 p-8 rounded-lg shadow-xs animate-fade-in-delay-2">
                    <h2 className="text-2xl font-semibold mb-8">Login</h2>

                    <form className="space-y-6" onSubmit={loginUser}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                            <input type="email" id="email" name="email" required  value={formData.email}
                            className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary"
                            placeholder="Your Email..."
                            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}/>
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
                            <input type="text" id="password" name="password" required value={formData.password}
                            className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary"
                            placeholder="Password..."
                            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}/>
                        </div>

                        <button disabled={isSubmitting} type="submit" className={cn("button-one w-full flex items-center justify-center gap-2 mt-12")}>
                            {isSubmitting ? <LoaderPinwheel /> : <LogIn size={25}/>}
                            
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}
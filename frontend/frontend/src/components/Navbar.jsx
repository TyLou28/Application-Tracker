import { cn } from "@/lib/utils.js"
import { LogOut, MenuIcon, X } from "lucide-react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const loggedInNavItems = [
    {name: "Home", href: "/"},
    {name: "View Applications", href: "/view-applications"},
]

const navItems = [
    {name: "Home", href: "/"},
    {name: "Login", href: "/login"},
    {name: "Sign Up", href: "/register"},

]

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const [LoggedIn, setLoggedIn] = useState(false)
    const [firstName, setFirstName] = useState("")

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener("scroll", handleScroll)

        checkLoggedIn()

        return () => window.removeEventListener("scroll", handleScroll)

    }, [])

    const checkLoggedIn = async () => {
        try {
            const token = localStorage.getItem("accessToken");
  
            if (token) {
                const response = await fetch("http://localhost:8000/user", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });
  
                if (!response.ok) {
                    throw new Error("Failed to authenticate user");
                }
  
                const data = await response.json();
                setLoggedIn(true);
                setFirstName(data.first_name); // Correctly accessing first name
            } else {
                setLoggedIn(false);
                setFirstName("");
            }
        } catch (err) {
            console.error("Error:", err);
            setLoggedIn(false);
            setFirstName("");
        }
    };

    const handleLogout = async () => {
        try {
          const refreshToken = localStorage.getItem("refreshToken");
          if (refreshToken) {
            await fetch("http://localhost:8000/users/logout", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ refresh: refreshToken }),
            });
          }
    
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
    
          setLoggedIn(false)
          setFirstName("")
          window.location.href = "/"
    
        }catch (err) {
          console.error("Logout failed:", err);
        }
      };

    return ( 
        <nav className={cn("fixed w-full z-40 transition-all duration-300",
            isScrolled ? "py-3 bg-background/80 backdrop-blur-md shadow-xs" : "py-5"
        )}>

            <div className="container flex items-center justify-between">
                <Link className="text-xl font-bold text-primary flex items-center" to="/">
                    <span className="ml-5 relative z-10">
                        <span className="text-glow text-foreground">Application</span> Tracker
                    </span>
                </Link>

                {/* Desktop navbar */}
                <div className="hidden md:flex space-x-8">
                    {LoggedIn ? (
                        <>
                            <h1 className="text-foreground/80 duration 300">
                                Hi, <span className="text-primary font-bold">{firstName}</span>
                            </h1>
                            {loggedInNavItems.map((item, key) => (
                                <Link key={key} to={item.href} className="text-foreground/80 hover:text-primary transition-colors duration 300">
                                    {item.name}
                                </Link>
                            ))}
                            <button className="button-one px-3 py-1 cursor-pointer duration 300" onClick={handleLogout}>Logout</button>                        
                        </>
                    ) : (
                        <>
                            {navItems.map((item, key) => (
                                <Link key={key} to={item.href} className="text-foreground/80 hover:text-primary transition-colors duration 300">
                                    {item.name}
                                </Link>
                            ))}
                        </>
                    )}
                </div>

                {/* Phone navbar */}
                <button onClick={() => setIsMenuOpen((prev) => !prev)}
                    className="md:hidden p-2 text-foreground z-50"
                    aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}> 
                    {isMenuOpen ? <X size={24} /> : <MenuIcon size={24} />} 
                </button>

                <div className={cn("fixed inset-0 bg-background/95 backdrop-blur-md z-40 flex flex-col items-center justify-center",
                    "transition-all duration-300 md:hidden",
                    isMenuOpen ? "opacity-100 pointer-events-auto" 
                    : "opacity-0 pointer-events-none"
                    )}>
                    <div className="flex flex-col space-y-8 text-xl">
                        {LoggedIn ? (
                            <>
                                {loggedInNavItems.map((item, key) => (
                                    <Link key={key} to={item.href} className="text-foreground/80 hover:text-primary transition-colors duration 300">
                                        {item.name}
                                    </Link>
                                ))}
                                <button className="button-one duration 300" onClick={handleLogout}>Logout</button>                                   
                            </>
                        ): (
                            <>
                                {navItems.map((item, key) => (
                                    <Link key={key}
                                    to={item.href} 
                                    className="text-foreground/80 hover:text-primary transition-colors duration 300"
                                    onClick={() => setIsMenuOpen(false)}>
                                        {item.name}
                                    </Link>
                                ))}                            
                            </>
                        )}

                    </div>
                </div>
            </div>

        </nav>
    )
}
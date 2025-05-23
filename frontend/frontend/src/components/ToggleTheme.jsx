import { useEffect, useState } from "react"
import { Sun, Moon } from "lucide-react"
import { cn } from "@/lib/utils.js"

export const ToggleTheme = () => {
    const [isDarkMode, setIsDarkMode] = useState(true);

    {/* Used to keep the page in either light or dark mode after refresh*/}
    useEffect(() => {
        const storedTheme = localStorage.getItem("theme")
        if (storedTheme == "dark") {
            setIsDarkMode(true)
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
            setIsDarkMode(false)
        }
    }, [])

    const toggleTheme = () => {
        if (isDarkMode) {
            localStorage.setItem("theme", "light")
            document.documentElement.classList.remove("dark");
            setIsDarkMode(false)
        } else {
            localStorage.setItem("theme", "dark")
            document.documentElement.classList.add("dark");
            setIsDarkMode(true)
        }
    }

    return (
        <button onClick={toggleTheme} className={cn("fixed max-sm:hidden top-4 right-4 z-50 p-1 rounded-full transition-colors duration-300",
            "focus:outline-hidden"
        )}>
        {" "}
        {isDarkMode ? (
            <Sun className="h-6 w-6 text-yellow-300 cursor-pointer"/>
        ) : (
            <Moon className="h-6 w-6 text-blue-900 cursor-pointer"/>
        )} 
        </button>
    )
}
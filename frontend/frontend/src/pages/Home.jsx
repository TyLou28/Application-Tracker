import { Navbar } from "../components/Navbar"
import { ToggleTheme } from "../components/ToggleTheme"

export const Home = () => {
    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
            <ToggleTheme />
            <Navbar />
        </div>
    )
}
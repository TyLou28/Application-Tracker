import { LoginFormSection } from "../components/LoginFormSection"
import { Navbar } from "../components/Navbar"
import { ToggleTheme } from "../components/ToggleTheme"

export const Login = () => {
    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
            <Navbar />
            <ToggleTheme />

            <main>
                <LoginFormSection />
            </main>
        </div>
    )
}
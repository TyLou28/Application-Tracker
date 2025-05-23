import { LoginFormSection } from "../components/LoginFormSection"
import { Navbar } from "../components/Navbar"

export const Login = () => {
    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
            <Navbar />

            <main>
                <LoginFormSection />
            </main>
        </div>
    )
}
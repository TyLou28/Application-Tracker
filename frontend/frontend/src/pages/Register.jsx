import { Navbar } from "../components/Navbar"
import { RegisterFormSection } from "../components/RegisterFormSection"
import { ToggleTheme } from "../components/ToggleTheme"

export const Register = () => {
    return (
        <div className="min-h-screen bg-background text-foreground  overflow-x-hidden">
            <Navbar />
            <ToggleTheme />

            <main>
                <RegisterFormSection />
            </main>
        </div>
    )
}
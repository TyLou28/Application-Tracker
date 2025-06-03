import { ApplicationTableSection } from "../components/ApplicationTableSection"
import { Navbar } from "../components/Navbar"
import { ToggleTheme } from "../components/ToggleTheme"

export const ViewApplications = () => {
    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
            <Navbar />
            <ToggleTheme />

            <main>
                <ApplicationTableSection />
            </main>
        </div>
    )
}
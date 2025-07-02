import { Navbar } from "../components/Navbar"
import { NotesSection } from "../components/NotesSection"
import { ToggleTheme } from "../components/ToggleTheme"

export const Notes = () => {
    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
            <Navbar />
            <ToggleTheme />

            <main>
                <NotesSection />
            </main>
        </div>
    )
}
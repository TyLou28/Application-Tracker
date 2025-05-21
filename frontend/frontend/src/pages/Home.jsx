import { AboutSection } from "../components/AboutSection"
import { HeroSection } from "../components/HeroSection"
import { Navbar } from "../components/Navbar"
import { ToggleTheme } from "../components/ToggleTheme"

export const Home = () => {
    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
            <ToggleTheme />
            <Navbar />

            <main>
                <HeroSection />
                <AboutSection />
            </main>
        </div>
    )
}
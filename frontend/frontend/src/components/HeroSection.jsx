export const HeroSection = () => {
    return (
        <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-4">
            
            <div className="container mx-auto max-w-4xl text-center z-10">

                <div className="space-y-6">
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
                        <span className="opacity-0 animate-fade-in">Your</span>
                        <span className="text-primary opacity-0 animate-fade-in-delay-2"> Application Tracker</span>
                    </h1>

                    <p className="text-lg md:text-xl text-muted-foreground max-2-2xl mx-auto opacity-0 animate-fade-in-delay-4">
                        <span className="text-gradient ml-2 opacity-0 animate-fade-in-delay-4">Built to keep a track of your <span className="text-primary font-bold">Job Applications</span></span>
                    </p>
                </div>
            </div>

        </section>
    )
}
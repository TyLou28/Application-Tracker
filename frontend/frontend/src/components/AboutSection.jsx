import { Notebook, NotebookPen, Pen } from "lucide-react"

export const AboutSection = () => {
    return (
        <section id="about" className="py-24 px-4 relative">
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                    About <span className="text-primary">Application Tracker</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h3 className="text-2xl font-semibold">
                            Efficiently Track and Oragnise your current and future Job Applications
                        </h3>

                        <p className="text-muted-foreground">
                            It can be hard to manage your job applications as a current student or recent graduate, whilst
                            balancing your studies and day-to-day activities
                        </p>

                        <p className="text-muted-foreground">
                            This app has been built to help with this problem, so say goodbye to those excel spreadsheets you use to record your applications!
                        </p>

                        <h4 className="text-2xl text-primary font-semibold">
                            Login Now or Start Here Today!
                        </h4>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
                            <a href="register" className="button-one">
                                Register
                            </a>

                            <a href="login" className="button-one">
                                Log In
                            </a>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        <h4 className="text-primary text-3xl font-semibold">
                            Features
                        </h4>
                        <div className="gradient-border p-6 card-hover">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <Pen className="h-6 w-6 text-primary"/>
                                </div>
                                <div className="text-left">
                                    <h4 className="font-semibold text-lg">Add Applications</h4>
                                    <p className="text-muted-foreground">Once you apply for a job, add details of your application to keep track of it</p>
                                </div>
                            </div>
                        </div>
                        <div className="gradient-border p-6 card-hover">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <Notebook className="h-6 w-6 text-primary"/>
                                </div>
                                <div className="text-left">
                                    <h4 className="font-semibold text-lg">View Applications</h4>
                                    <p className="text-muted-foreground">View all of your current active applications, whilst being able to edit them as the application progresses</p>
                                </div>
                            </div>
                        </div>
                        <div className="gradient-border p-6 card-hover">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <NotebookPen className="h-6 w-6 text-primary"/>
                                </div>
                                <div className="text-left">
                                    <h4 className="font-semibold text-lg">Add and Edit Notes</h4>
                                    <p className="text-muted-foreground">Record and edit any notes that you have researched about the company, job role and similar roles</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
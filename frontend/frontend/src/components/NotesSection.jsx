import { useLocation, useParams } from "react-router-dom"
export const NotesSection = () => {
    const { pk } = useParams();
    const location = useLocation();
    const { role, company } = location.state || {};

    return (
        <section className="py-24 px-4 relative bg-secondary/30">
            <div className="container mx-auto max-w-5xl">
                <h3 className="text-3xl md:text-4xl font-bold mb-16 text-center opacity-0 animate-fade-in-delay-1">
                    Your Notes for the <span className="text-primary">{role}</span> at <span className="text-primary">{company}</span>
                    <p>{pk}</p>
                </h3>
            </div>
        </section>
    )
}
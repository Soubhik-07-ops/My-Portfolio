"use client";
import ProjectCard from "@/components/ProjectCard";

const projects = [
    {
        title: "AI Model Benchmarking Tool",
        description: "Benchmarked 25+ ML models with PDF reports, <50ms latency, and real-time dashboard via Supabase.",
        tech: ["Next.js", "Supabase", "PostgreSQL", "Pandas"],
        github: "#",
    },
    {
        title: "PrepIQ – AI-Powered Exam Platform",
        description: "AI-driven exam strategy with question prediction, drag-drop UI, and PDF kits for students & teachers.",
        tech: ["React", "Express", "JWT", "MongoDB"],
        github: "#",
    },
    {
        title: "Face Mask Detection System",
        description: "Deployed 98% accurate MobileNetV2 model with Flask REST API and OpenCV webcam stream.",
        tech: ["Flask", "OpenCV", "CNN", "IoT"],
        github: "#",
    },
    {
        title: "BookNest E-Commerce",
        description: "Built full-stack book store with PAN-India shipping and Lighthouse score >90.",
        tech: ["Next.js", "Tailwind", "Node.js"],
        github: "#",
        demo: "#",
    },
    {
        title: "EV-Routing Algorithm – IIT Dhanbad",
        description: "Optimized 20-truck fleet on 500km+ routes, cutting turnaround by 20% using custom EV-routing algos.",
        tech: ["TypeScript", "Flask", "Next.js", "DataViz"],
    },
];

export default function ProjectsSection() {
    return (
        <section
            id="projects"
            className="max-w-6xl mx-auto px-6 py-16 scroll-mt-20"
            style={{
                // Add your desired background color here to hide the global particles.
                // For example, if your main site background is white, use white here.
                backgroundColor: 'black', // Or use 'your-site-main-bg-color'
                position: 'relative', // Good practice to keep this
                zIndex: 10,           // Ensure this section is above the global particles (z-index: -1)
            }}
        >
            <h1 className="text-4xl font-bold text-primary mb-8">Projects</h1>

            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                {projects.map((proj, i) => (
                    <ProjectCard key={i} {...proj} />
                ))}
            </div>
        </section>
    );
}

import { ServiceCard } from "@/components/ui/service-card";

const Demo = () => {
    const services = [
        {
            title: "Gamification Marketing",
            href: "/services/gamification",
            imgSrc: "https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=500&q=80",
            imgAlt: "Technology dashboard illustration",
            variant: "red",
        },
        {
            title: "Graphic Design",
            href: "/services/design",
            imgSrc: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=500&q=80",
            imgAlt: "Design workspace with laptop",
            variant: "default",
        },
        {
            title: "Analytics and Tracking",
            href: "/services/analytics",
            imgSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=500&q=80",
            imgAlt: "Analytics charts on screen",
            variant: "gray",
        },
        {
            title: "Content Creation",
            href: "/services/content",
            imgSrc: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=500&q=80",
            imgAlt: "Notebook and writing setup",
            variant: "blue",
        },
    ];

    return (
        <div className="w-full max-w-5xl mx-auto p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {services.map((service) => (
                    <ServiceCard
                        key={service.title}
                        title={service.title}
                        href={service.href}
                        imgSrc={service.imgSrc}
                        imgAlt={service.imgAlt}
                        variant={service.variant as "red" | "default" | "gray" | "blue"}
                        className="min-h-[180px]"
                    />
                ))}
            </div>
        </div>
    );
};

export default Demo;

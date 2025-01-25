interface Fact {
    icon: string;
    title: string;
    subtitle: string;
}

const facts: Fact[] = [
    {
        icon: "/svgs/rocket.svg",
        title: "Passion-Fueled Learning",
        subtitle: "Discover what you love and immerse yourself in learning experiences that ignite your passion.",
    },
    {
        icon: "/svgs/verify.svg",
        title: "Impactful Contributions",
        subtitle: "Contribute to the world’s needs, making a positive impact through your chosen career path.",
    },
    {
        icon: "/svgs/user.svg",
        title: "Mastery and Expertise",
        subtitle: "Hone your skills and excel in what you’re good at with expert guidance and resources.",
    },
    {
        icon: "/svgs/diamond.svg",
        title: "Valuable Pursuits",
        subtitle: "Engage in meaningful work that you can be paid for, aligning your career with financial sustainability.",
    }
];

const WhyUs = () => {
    return (
        <div className="p-10">
            <div className="flex flex-col gap-y-3 bg-[#E2EEF8] rounded-xl py-6">
                <div className="w-full px-[10%] text-center">
                    <h2 className="text-3xl font-bold mb-8"> Why Choose Us for Your E-Coaching Journey?</h2>
                    <p className="mb-12 px-0 lg:px-[15%] text-center font-semibold">
                        Unlock your true potential by discovering what you love and excel at. Our platform connects you with expert mentors who guide you to achieve your career goals and make a meaningful impact in the world.
                    </p>
                </div>
                <div className="flex flex-col lg:flex-row mt-6 px-[5%] gap-5">
                    <div className="w-full lg:w-[60%]">
                        <img src="/svgs/burner.svg" alt="star" className="" />
                    </div>
                    <div className="w-full lg:w-[40%] p-[2%]">
                        {facts.map((fact, index) => (
                            <div key={index} className="flex items-center gap-4 px-4 py-6 bg-white rounded-lg border border-blue-300 mb-4">
                                <img src={fact.icon} alt={fact.title} className="w-16 h-16" />
                                <div>
                                    <h3 className="font-bold text-lg">{fact.title}</h3>
                                    <p className="text-gray-500 text-sm">{fact.subtitle}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WhyUs
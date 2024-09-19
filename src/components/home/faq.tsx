import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

interface AccordionItem {
    title: string;
    content: string;
}

const Faq: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const handleToggle = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const faqData: AccordionItem[] = [
        {
            title: "What is GOYA (Go Young Africa)?",
            content: `GOYA (Go Young Africa) is a transformative initiative dedicated to empowering youngsters 
            through meaningful connections with mentors and career coaches. Our mission is to unlock the 
            untapped potential of young minds by engaging them in real-world projects through project-based 
            experience from their mentors. By fostering these invaluable relationships, we create job 
            opportunities, cultivate human capital, and inspire students to identify and passionately pursue 
            their true calling. Join us in shaping the future of Africa, one young leader at a time.`,
        },
        {
            title: "How can I get involved with GOYA?",
            content: `You can get involved with GOYA as a Career Coach and Mentor, Student, Employer, or GCA 
            (GOYA Competency Assessor). Simply fill out the relevant application form on our website to get 
            started.`,
        },
        {
            title: "What are the benefits of joining GOYA?",
            content: `For students, GOYA provides mentorship, career coaching, and networking opportunities. For 
            mentors, it offers the chance to give back and shape the future of young Africans. Employers 
            can access a pool of talented young professionals, and GCAs can contribute to the professional 
            development of the community.`,
        },
        {
            title: "Who can apply to be a mentor?",
            content: `Any student currently enrolled in high school, undergraduate, or graduate programs can 
            apply to be a mentee in the GOYA program.`,
        },
        {
            title: "What is required to become a mentor?",
            content: `Potential mentors should have significant professional experience in their field, a passion for 
            mentoring, and the ability to commit time to regular mentorship sessions.`,
        },
        {
            title: "How can employers benefit from GOYA?",
            content: `Employers can benefit by accessing a pool of talented and motivated young professionals, 
            providing mentorship, and offering job or internship opportunities to qualified students.`,
        },
        {
            title: "How do we post job opportunities with GOYA?",
            content: `Employers would post job opportunities by filling out the relevant section in the employer 
            application form on our website. Our team will review and share the opportunities with 
            potential candidates.`,
        },
        {
            title: "What qualifications are needed to become a GCA?",
            content: `GCAs should have extensive experience in their field, particularly in HR, training and 
            development, or quality assurance. Professional certifications and a passion for contributing to 
            the professional growth of others are also important.`,
        },
        {
            title: "What is the role of a GCA?",
            content: `GCAs assess the competencies of students and mentors, ensuring that the mentoring and 
            coaching provided align with industry standards and effectively meet the goals of the 
            participants.`,
        },
        {
            title: "Where can I find more resources and updates about GOYA?",
            content: `You can find more resources and updates on our website, blog, and social media channels. 
            Follow us on [Facebook](#), [Twitter](#), and [LinkedIn](#) for the latest news and events.`,
        },
    ];

    return (
        <div className="p-10">
            <div className="flex flex-col gap-y-3 bg-[#E2EEF8] rounded-xl py-6">
                <div className="w-full px-[10%] text-center">
                    <h2 className="text-3xl font-bold mb-8">
                        FAQ’s
                    </h2>
                    <p className="mb-12 px-0 lg:px-[15%] md:px-[15%] text-center font-semibold">
                        Discover more about GOYA through those Frequently Asked Questions
                    </p>
                </div>
                <div className="grid grid-cols-1  gap-4 py-6 px-10">
                    {faqData.map((faq, index) => (
                        <div
                            key={index}
                            className="border rounded-lg shadow-sm px-4 py-5 bg-white"
                        >
                            <div
                                className="flex justify-between items-center"

                            >
                                <h3 className="text-lg font-semibold">{faq.title}</h3>
                                <button
                                    className="text-gray-500 bg-[#F7F7FF] py-2 px-3 rounded-lg cursor-pointer"
                                    onClick={() => handleToggle(index)}
                                >
                                    {activeIndex === index ? <FaMinus /> : <FaPlus />}
                                </button>
                            </div>
                            {activeIndex === index && (
                                <p className="text-gray-500 mt-2">
                                    {faq.content}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Faq;
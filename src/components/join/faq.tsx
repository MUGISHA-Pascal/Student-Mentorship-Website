/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import classNames from 'classnames';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import './faq.css';
import { motion } from 'framer-motion';

const faqData = [
    {
        title: "What is GOYA (Go Young Africa)?",
        content: `GOYA (Go Young Africa) is a transformative initiative dedicated to empowering youngsters 
        through meaningful connections with mentors and career coaches. Our mission is to unlock the 
        untapped potential of young minds by engaging them in real-world projects through project
        based experience from their mentors. By fostering these invaluable relationships, we create job 
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
    // {
    //     title: "What can I expect from my mentor?",
    //     content: `Your mentor will provide guidance, support, and career advice tailored to your goals and 
    //     needs. They will help you develop skills, prepare for job interviews, and navigate your career 
    //     path.`,
    // },
    {
        title: "What is required to become a mentor?",
        content: `Potential mentors should have significant professional experience in their field, a passion for 
        mentoring, and the ability to commit time to regular mentorship sessions.`,
    },
    // {
    //     title: "How often do mentorship sessions occur?",
    //     content: `The frequency of mentorship sessions can vary based on the preferences of the mentor and 
    //     mentee. Typically, sessions are held weekly, bi-weekly, or monthly.`,
    // },
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
    // {
    //     title: "How can I contact GOYA for more information?",
    //     content: `You can contact us via email at [we will put that email we plan to create] or through our 
    //     contact form on the website. We are here to help with any questions or support you may need.`,
    // },
    {
        title: "Where can I find more resources and updates about GOYA?",
        content: `You can find more resources and updates on our website, blog, and social media channels. 
        Follow us on [Facebook](#), [Twitter](#), and [LinkedIn](#) for the latest news and events.`,
    },
];

const FAQ = () => {
    return (
        <div className="max-w-4xl mx-auto p-4">
            <motion.h1
                className="text-3xl font-semibold mb-16 text-center"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6 }}
            >
                Frequently Asked Questions (FAQs)
            </motion.h1>
            <Accordion.Root className="AccordionRoot" type="single" defaultValue="item-1" collapsible>
                {faqData.map((faq, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -80 : 80 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.9, delay: 0.5 }}
                    >
                        <Accordion.Item className="AccordionItem" value={`item-${index + 1}`}>
                            <AccordionTrigger>{faq.title}</AccordionTrigger>
                            <AccordionContent>{faq.content}</AccordionContent>
                        </Accordion.Item>
                    </motion.div>
                ))}
            </Accordion.Root>
        </div>
    );
}

type AccordionTriggerProps = {
    children: React.ReactNode;
    className?: string;
};

const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
    ({ children, className, ...props }, forwardedRef) => (
        <Accordion.Header className="AccordionHeader cursor-pointer">
            <Accordion.Trigger
                className={classNames('AccordionTrigger', className)}
                {...props}
                ref={forwardedRef}
            >
                {children}
                <ChevronDownIcon className="AccordionChevron" aria-hidden />
            </Accordion.Trigger>
        </Accordion.Header>
    )
);

type AccordionContentProps = {
    children: React.ReactNode;
    className?: string;
};

const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
    ({ children, className, ...props }, forwardedRef) => (
        <Accordion.Content
            className={classNames('AccordionContent', className)}
            {...props}
            ref={forwardedRef}
        >
            <div className="AccordionContentText">{children}</div>
        </Accordion.Content>
    ));

export default FAQ;
